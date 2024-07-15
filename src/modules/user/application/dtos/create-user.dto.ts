import { IsNotEmpty } from 'class-validator';
import { Genre } from 'src/core/enums/genre';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  genre: Genre;

  imgSrc: string;
}
