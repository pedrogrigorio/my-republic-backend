import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { CreateUserUseCase } from '@src/modules/user/application/use-cases/create-user.usecase';
import { UserFactory } from '@test/factories/user.factory';
import { PasswordNotMatchException } from '@src/modules/user/domain/exceptions/password-not-match.exception';
import { EmailAlreadyExistsException } from '@src/modules/user/domain/exceptions/email-already-exists.exception';

describe('Create User Use Case', () => {
  it('should be able to create a new user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);

    await createUser.execute(UserFactory.makeCreateUserDto());

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
    const createUser = new CreateUserUseCase(userRepository);

    await createUser.execute(UserFactory.makeCreateUserDto());

    await createUser.execute(
      UserFactory.makeCreateUserDto({
        email: 'example@email.com',
      }),
    );

    await expect(
      createUser.execute(
        UserFactory.makeCreateUserDto({
          name: 'AnotherJohnDoe',
          email: 'example@email.com',
        }),
      ),
    ).rejects.toThrow(EmailAlreadyExistsException);
  });

  it('should not be able to create a new user when password and confirmPassword do not match', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);

    const createUserDto = UserFactory.makeCreateUserDto({
      password: 'strongPassword123!@#',
      passwordConfirm: 'differentPassword123!@#',
    });

    await expect(createUser.execute(createUserDto)).rejects.toThrow(
      PasswordNotMatchException,
    );
  });
});
