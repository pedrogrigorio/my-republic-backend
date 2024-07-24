import { AuthUserDto } from '../dtos/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../infrastrucutre/types/jwt-payload.interface';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class LoginUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(authUserDto: AuthUserDto): Promise<TokenDto> {
    const payload: JwtPayload = {
      sub: authUserDto.id,
      name: authUserDto.name,
      email: authUserDto.email,
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
