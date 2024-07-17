import { CreateUserUseCase } from '@src/modules/user/application/use-cases/create-user.usecase';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserFactory } from '@test/factories/user.factory';

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
    expect(createdUser.imgSrc).toBe('https://example.com/images/johndoe.jpg');
    expect(createdUser.genre).toBe(0);
  });
});
