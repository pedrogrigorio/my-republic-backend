import { ValidateUserUseCase } from '../../application/use-cases/validate-user.usecase';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { LoginDto } from '../../application/dtos/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AuthUserDto> {
    const user = await this.validateUserUseCase.execute({
      email,
      password,
    } as LoginDto);

    return user;
  }
}
