import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { GetUserByEmailUseCase } from '@src/modules/user/application/use-cases/get-user-by-email.usecase';
import { BCryptHashingService } from '@src/core/services/hashing/bcrypt-hashing.service';
import { ValidateUserUseCase } from '@src/modules/auth/application/use-cases/validate-user.usecase';
import { AuthException } from '@src/modules/auth/domain/exceptions/auth.exception';
import { UserFactory } from '@test/factories/user.factory';

describe('Validate User Use Case', () => {
  it('should be able to validate a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);
    const validateUser = new ValidateUserUseCase(
      getUserByEmail,
      hashingService,
    );

    const hashPassword = await hashingService.hash('strongPassword123!@#', 10);

    const createdUser = await userRepository.create(
      UserFactory.makeEntity({
        email: 'teste@example.com',
        password: hashPassword,
      }),
    );

    const user = await validateUser.execute({
      email: 'teste@example.com',
      password: 'strongPassword123!@#',
    });

    expect(user.id).toBe(createdUser.id);
  });

  it('should not be able to allow a user with wrong password', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);
    const validateUser = new ValidateUserUseCase(
      getUserByEmail,
      hashingService,
    );

    const hashPassword = await hashingService.hash('strongPassword123!@#', 10);

    await userRepository.create(
      UserFactory.makeEntity({
        email: 'teste@example.com',
        password: hashPassword,
      }),
    );

    await expect(
      validateUser.execute({
        email: 'teste@example.com',
        password: 'strongPassword123!@',
      }),
    ).rejects.toThrow(AuthException);
  });

  it('should not be able to allow a user with wrong email', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);
    const validateUser = new ValidateUserUseCase(
      getUserByEmail,
      hashingService,
    );

    const hashPassword = await hashingService.hash('strongPassword123!@#', 10);

    await userRepository.create(
      UserFactory.makeEntity({
        email: 'teste@example.com',
        password: hashPassword,
      }),
    );

    await expect(
      validateUser.execute({
        email: 'wrong@example.com',
        password: 'strongPassword123!@#',
      }),
    ).rejects.toThrow(AuthException);
  });
});
