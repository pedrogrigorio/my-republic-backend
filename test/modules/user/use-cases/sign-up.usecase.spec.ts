import { EmailAlreadyExistsException } from '@src/modules/user/domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '@src/modules/user/domain/exceptions/password-not-match.exception';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { SignUpUseCase } from '@src/modules/user/application/use-cases/sign-up.usecase';
import { UserFactory } from '@test/factories/user.factory';
import { BCryptHashingService } from '@src/core/services/hashing/bcrypt-hashing.service';

describe('Sign Up Use Case', () => {
  it('should be able to create a new user', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const createUser = new SignUpUseCase(userRepository, hashingService);

    await createUser.execute(UserFactory.makeSignUpDto());

    expect(userRepository.users).toHaveLength(1);

    const createdUser = await userRepository.findByEmail(
      'john.doe@example.com',
    );

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe('John Doe');
    expect(createdUser.email).toBe('john.doe@example.com');
    expect(createdUser.genre).toBe(0);
  });

  it('should not be able to create a new user with an already registered email', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const createUser = new SignUpUseCase(userRepository, hashingService);

    await createUser.execute(UserFactory.makeSignUpDto());

    await createUser.execute(
      UserFactory.makeSignUpDto({
        email: 'example@email.com',
      }),
    );

    await expect(
      createUser.execute(
        UserFactory.makeSignUpDto({
          name: 'AnotherJohnDoe',
          email: 'example@email.com',
        }),
      ),
    ).rejects.toThrow(EmailAlreadyExistsException);
  });

  it('should not be able to create a new user when password and confirmPassword do not match', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashingService = new BCryptHashingService();
    const createUser = new SignUpUseCase(userRepository, hashingService);

    const createUserDto = UserFactory.makeSignUpDto({
      password: 'strongPassword123!@#',
      passwordConfirm: 'differentPassword123!@#',
    });

    await expect(createUser.execute(createUserDto)).rejects.toThrow(
      PasswordNotMatchException,
    );
  });
});
