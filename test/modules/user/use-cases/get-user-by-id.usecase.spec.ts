import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { GetUserByIdUseCase } from '@src/modules/user/application/use-cases/get-user-by-id.usecase';
import { UserFactory } from '@test/factories/user.factory';
import { UserNotFoundException } from '@src/modules/user/domain/exceptions/user-not-found.exception';

describe('Get User By Id Use Case', () => {
  it('should be able to get an existing user by id', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserById = new GetUserByIdUseCase(userRepository);

    const user = await userRepository.create(UserFactory.makeEntity());

    const response = await getUserById.execute(user.id);

    expect(response.id).toEqual(user.id);
    expect(response.email).toEqual(user.email);
    expect(response.name).toEqual(user.name);
  });

  it('should not be able to get an not found user by id', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserById = new GetUserByIdUseCase(userRepository);

    await expect(getUserById.execute(0)).rejects.toThrow(UserNotFoundException);
  });
});
