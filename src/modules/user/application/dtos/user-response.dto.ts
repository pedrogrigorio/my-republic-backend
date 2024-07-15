import { Genre } from 'src/core/enums/genre';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  imgSrc: string;
  genre: Genre;
}
