import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';
import { LocalStorageService } from '@src/core/storage/local-storage.service';
import { DeleteUserUseCase } from '@src/modules/user/application/use-cases/delete-user.usecase';
import { UserFactory } from '@test/factories/user.factory';

describe('Delete User Use Case', () => {
  it('should be able to delete an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const storageService = new LocalStorageService();
    const deleteUser = new DeleteUserUseCase(userRepository, storageService);

    const user = await userRepository.create(
      UserFactory.makeEntity({
        imgSrc: undefined,
      }),
    );

    await deleteUser.execute(user.id);

    const users = await userRepository.findAll();

    expect(users).toHaveLength(0);
  });

  it('should not be able to delete a not found user', async () => {
    const userRepository = new InMemoryUserRepository();
    const storageService = new LocalStorageService();
    const deleteUser = new DeleteUserUseCase(userRepository, storageService);

    await expect(deleteUser.execute(0)).rejects.toThrow(UserNotFoundException);
  });
});
