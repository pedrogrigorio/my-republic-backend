import { AuthUserDto } from '../dtos/auth-user.dto';
import { User } from '@src/modules/user/domain/entities/user';

export class AuthUserMapper {
  static toDto(user: User): AuthUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      genre: user.genre,
      imgSrc: user.imgSrc,
    };
  }
}
