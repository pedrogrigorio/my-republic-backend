import { PasswordNotMatchException } from '@src/modules/user/domain/exceptions/password-not-match.exception';
import { InvalidPasswordException } from '@src/modules/user/domain/exceptions/invalid-password.exception';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { UpdatePasswordUseCase } from '@src/modules/user/application/use-cases/update-password.usecase';
import { UserFactory } from '@test/factories/user.factory';
import { BCryptHashingService } from '@src/core/services/hashing/bcrypt-hashing.service';

describe('Update Password Use Case', () => {
  it('should be able to update the password of an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const updatePassword = new UpdatePasswordUseCase(
      userRepository,
      hashingService,
    );

    const password = await hashingService.hash('strongPassword123!@#', 10);

    const user = await userRepository.create(
      UserFactory.makeEntity({
        password,
      }),
    );

    await updatePassword.execute(
      {
        oldPassword: 'strongPassword123!@#',
        newPassword: 'newStrongPassword123!@#',
        confirmNewPassword: 'newStrongPassword123!@#',
      },
      user.id,
    );

    const updatedUser = await userRepository.findById(user.id);

    const changeSuccessful = await hashingService.compare(
      'newStrongPassword123!@#',
      updatedUser.password,
    );

    expect(changeSuccessful).toBe(true);
  });

  it('should not be able to update the password of a not found user', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const updatePassword = new UpdatePasswordUseCase(
      userRepository,
      hashingService,
    );

    await await expect(
      updatePassword.execute(
        {
          oldPassword: 'strongPassword123!@#',
          newPassword: 'newStrongPassword123!@#',
          confirmNewPassword: 'newStrongPassword123!@#',
        },
        0,
      ),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should not be able to update the password with old password wrong', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const updatePassword = new UpdatePasswordUseCase(
      userRepository,
      hashingService,
    );

    const user = await userRepository.create(
      UserFactory.makeEntity({
        password: 'strongPassword123!@#',
      }),
    );

    await expect(
      updatePassword.execute(
        {
          oldPassword: 'wrongPassword123!@#',
          newPassword: 'newStrongPassword123!@#',
          confirmNewPassword: 'newStrongPassword123!@#',
        },
        user.id,
      ),
    ).rejects.toThrow(InvalidPasswordException);
  });

  it('should not be able to update the password with passwords that do not match', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const updatePassword = new UpdatePasswordUseCase(
      userRepository,
      hashingService,
    );

    const user = await userRepository.create(
      UserFactory.makeEntity({
        password: 'strongPassword123!@#',
      }),
    );

    await expect(
      updatePassword.execute(
        {
          oldPassword: 'strongPassword123!@#',
          newPassword: 'newStrongPassword123!@#',
          confirmNewPassword: 'otherPassword123!@#',
        },
        user.id,
      ),
    ).rejects.toThrow(PasswordNotMatchException);
  });
});
