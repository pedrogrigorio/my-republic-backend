import { SignUpDto } from '@src/modules/user/application/dtos/sign-up.dto';
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

  static makeSignUpDto(overrides?: Partial<SignUpDto>) {
    const defaultDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123!@#',
      passwordConfirm: 'securePassword123!@#',
      genre: 0,
    };

    return { ...defaultDto, ...overrides } as SignUpDto;
  }
}
