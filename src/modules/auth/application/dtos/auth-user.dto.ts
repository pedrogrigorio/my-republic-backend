import { Gender } from '@src/core/enums/gender';

export class AuthUserDto {
  id: number;
  name: string;
  email: string;
  imgSrc: string;
  gender: Gender;
}
