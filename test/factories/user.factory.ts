import { CreateUserDto } from '@src/modules/user/application/dtos/create-user.dto';
import { User } from '@src/modules/user/domain/entities/user';

export class UserFactory {
  static makeEntity(overrides?: Partial<User>) {
    const defaultUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123!@#',
      imgSrc: 'https://example.com/images/johndoe.jpg',
      genre: 0,
    };

    return new User({ ...defaultUser, ...overrides });
  }

  static makeCreateUserDto(overrides?: Partial<CreateUserDto>) {
    const defaultDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123!@#',
      passwordConfirm: 'securePassword123!@#',
      imgSrc: 'https://example.com/images/johndoe.jpg',
      genre: 0,
    };

    return { ...defaultDto, ...overrides } as CreateUserDto;
  }
}
