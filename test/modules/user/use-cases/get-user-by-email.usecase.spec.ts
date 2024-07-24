import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { GetUserByEmailUseCase } from '@src/modules/user/application/use-cases/get-user-by-email.usecase';
import { UserFactory } from '@test/factories/user.factory';

describe('Get User By Email Use Case', () => {
  it('should be able to get an existing user by email', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);

    const user = await userRepository.create(
      UserFactory.makeEntity({
        email: 'teste@example.com',
      }),
    );

    const response = await getUserByEmail.execute('teste@example.com');

    expect(response).toEqual(user);
  });
});
