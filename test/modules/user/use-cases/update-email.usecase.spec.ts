import { EmailAlreadyExistsException } from '@src/modules/user/domain/exceptions/email-already-exists.exception';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { UpdateEmailUseCase } from '@src/modules/user/application/use-cases/update-email.usecase';
import { CreateUserUseCase } from '@src/modules/user/application/use-cases/create-user.usecase';
import { UserFactory } from '@test/factories/user.factory';

describe('Update Email Use Case', () => {
  it('should be able to update the email of an existent user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);
    const updateEmail = new UpdateEmailUseCase(userRepository);

    const userDto = UserFactory.makeCreateUserDto({
      email: 'test@example.com',
    });

    const newUser = await createUser.execute(userDto);

    const updatedUser = await updateEmail.execute(
      {
        newEmail: 'john.doe@email.com',
      },
      newUser.id,
    );

    expect(updatedUser).toBeTruthy();
    expect(updatedUser.email).toBe('john.doe@email.com');
  });

  it('should not be able to update the email of an user not found', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateEmail = new UpdateEmailUseCase(userRepository);

    await expect(
      updateEmail.execute({ newEmail: 'john.doe@example.com' }, 0),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should not be able to update the email to an email already registered', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);
    const updateEmail = new UpdateEmailUseCase(userRepository);

    await createUser.execute(
      UserFactory.makeCreateUserDto({
        email: 'john.doe@example.com',
      }),
    );

    const userToBeUpdated = await createUser.execute(
      UserFactory.makeCreateUserDto({
        email: 'test@example.com',
      }),
    );

    await expect(
      updateEmail.execute(
        { newEmail: 'john.doe@example.com' },
        userToBeUpdated.id,
      ),
    ).rejects.toThrow(EmailAlreadyExistsException);
  });
});
