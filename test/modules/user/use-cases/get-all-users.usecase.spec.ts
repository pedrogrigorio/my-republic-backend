import { GetAllUsersUseCase } from '@src/modules/user/application/use-cases/get-all-users.usecase';
import { User } from '@src/modules/user/domain/entities/user';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';

describe('Get all users', () => {
  it('should be able to get all users', async () => {
    const userRepository = new InMemoryUserRepository();
    const getAllUsers = new GetAllUsersUseCase(userRepository);

    await userRepository.create(
      new User({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securePassword123!@#',
        imgSrc: 'https://example.com/images/johndoe.jpg',
        genre: 0,
      }),
    );

    await userRepository.create(
      new User({
        name: 'John Doe',
        email: 'john.doe2@example.com',
        password: 'securePassword123!@#',
        imgSrc: 'https://example.com/images/johndoe.jpg',
        genre: 0,
      }),
    );

    const users = await getAllUsers.execute();

    expect(users).toHaveLength(2);
  });
});
