import { EmailAlreadyExistsException } from '@src/modules/user/domain/exceptions/email-already-exists.exception';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { UpdateEmailUseCase } from '@src/modules/user/application/use-cases/update-email.usecase';
import { UserFactory } from '@test/factories/user.factory';

describe('Update Email Use Case', () => {
  it('should be able to update the email of an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateEmail = new UpdateEmailUseCase(userRepository);

    const user = UserFactory.makeEntity({
      email: 'test@example.com',
    });

    await userRepository.create(user);

    await updateEmail.execute(
      {
        newEmail: 'john.doe@email.com',
      },
      user.id,
    );

    const updatedUser = await userRepository.findById(user.id);

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
    const updateEmail = new UpdateEmailUseCase(userRepository);

    await userRepository.create(
      UserFactory.makeEntity({
        email: 'john.doe@example.com',
      }),
    );

    const userToBeUpdated = await userRepository.create(
      UserFactory.makeEntity({
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
