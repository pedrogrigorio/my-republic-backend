import { Gender } from '@src/core/enums/gender';
import { IsEmail, IsIn, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
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
  @IsIn([Gender.MALE, Gender.FEMALE])
  gender: Gender;
}
