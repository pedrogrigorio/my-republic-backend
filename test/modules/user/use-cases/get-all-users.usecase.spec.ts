import { GetAllUsersUseCase } from '@src/modules/user/application/use-cases/get-all-users.usecase';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserFactory } from '@test/factories/user.factory';

describe('Get All Users Use Case', () => {
  it('should be able to get all users', async () => {
    const userRepository = new InMemoryUserRepository();
    const getAllUsers = new GetAllUsersUseCase(userRepository);

    await userRepository.create(UserFactory.makeEntity());

    await userRepository.create(
      UserFactory.makeEntity({ email: 'john.doe2@example.com' }),
    );

    const users = await getAllUsers.execute();

    expect(users).toHaveLength(2);
  });
});
