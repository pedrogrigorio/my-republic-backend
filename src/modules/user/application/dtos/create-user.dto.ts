import { IsEmail, IsIn, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Genre } from 'src/core/enums/genre';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;

  @IsNotEmpty()
  @IsIn([Genre.MALE, Genre.FEMALE])
  genre: Genre;

  imgSrc: string;
}
