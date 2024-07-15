import { User } from '../../domain/entities/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

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
      imgSrc: userDto.imgSrc,
    });
  }
}
