import { User } from '@src/modules/user/domain/entities/user';

export class UserFactory {
  static createUser(overrides?: Partial<User>) {
    const defaultUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123!@#',
      imgSrc: 'https://example.com/images/johndoe.jpg',
      genre: 0,
    };

    return new User({ ...defaultUser, ...overrides });
  }
}
