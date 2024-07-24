import { Genre } from '@src/core/enums/genre';

export class AuthUserDto {
  id: number;
  name: string;
  email: string;
  imgSrc: string;
  genre: Genre;
}
