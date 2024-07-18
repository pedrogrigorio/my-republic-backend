import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
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

  static fromCreateUserDto(userDto: CreateUserDto): User {
    return new User({
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
      genre: userDto.genre,
    });
  }
}
