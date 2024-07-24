import { GetUserByEmailUseCase } from '@src/modules/user/application/use-cases/get-user-by-email.usecase';
import { AuthUserMapper } from '../mappers/auth-user.mapper';
import { AuthException } from '../../domain/exceptions/unauthorized.exception';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class ValidateUserUseCase {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {}

  async execute(loginDto: LoginDto): Promise<AuthUserDto> {
    const { email, password } = loginDto;

    const user = await this.getUserByEmailUseCase.execute(email);

    if (user) {
      const isPasswordValid = password === user.password;

      if (isPasswordValid) {
        return AuthUserMapper.toDto(user);
      }
    }

    throw new AuthException('Email address or password provided is incorrect.');
  }
}
