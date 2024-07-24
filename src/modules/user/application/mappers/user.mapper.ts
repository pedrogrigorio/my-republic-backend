import { UserResponseDto } from '../dtos/user-response.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { User } from '../../domain/entities/user';

export class UserMapper {
  static toDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      genre: user.genre,
      imgSrc: user.imgSrc,
    };
  }

  static fromSignUpDto(userDto: SignUpDto): User {
    return new User({
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
      genre: userDto.genre,
    });
  }
}
