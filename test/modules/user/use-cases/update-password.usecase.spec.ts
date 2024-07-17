import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UpdatePasswordUseCase } from '@src/modules/user/application/use-cases/update-password.usecase';
import { UserFactory } from '@test/factories/user.factory';

describe('Update Password Use Case', () => {
  it('should be able to update the password of an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updatePassword = new UpdatePasswordUseCase(userRepository);

    const user = await userRepository.create(
      UserFactory.makeEntity({
        password: 'strongPassword123!@#',
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

    expect(updatedUser.password).toBe('newStrongPassword123!@#');
  });
});
