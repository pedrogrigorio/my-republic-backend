import { Gender } from '@src/core/enums/gender';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  imgSrc: string;
  gender: Gender;
}
