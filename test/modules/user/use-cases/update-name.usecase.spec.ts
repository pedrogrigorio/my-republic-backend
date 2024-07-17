import { UpdateNameUseCase } from '@src/modules/user/application/use-cases/update-name.usecase';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserFactory } from '@test/factories/user.factory';

describe('Update Name Use Case', () => {
  it('should be able to update the name of an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateName = new UpdateNameUseCase(userRepository);

    const user = await userRepository.create(
      UserFactory.makeEntity({
        name: 'John Doe',
      }),
    );

    await updateName.execute({ newName: 'John' }, user.id);

    const updatedUser = await userRepository.findById(user.id);

    expect(updatedUser.name).toBe('John');
  });

  it('should not be able to update the name of a not found user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateName = new UpdateNameUseCase(userRepository);

    await expect(updateName.execute({ newName: 'John' }, 0)).rejects.toThrow(
      UserNotFoundException,
    );
  });
});
