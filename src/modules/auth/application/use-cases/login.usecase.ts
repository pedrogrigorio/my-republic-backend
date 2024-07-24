import { TokenService } from '../interfaces/token.service.interface';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { PayloadDto } from '../dtos/payload.interface';
import { Injectable } from '@nestjs/common';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class LoginUseCase {
  constructor(private tokenService: TokenService) {}

  async execute(authUserDto: AuthUserDto): Promise<TokenDto> {
    const payload: PayloadDto = {
      sub: authUserDto.id,
      name: authUserDto.name,
      email: authUserDto.email,
    };

    const token = this.tokenService.generateToken(payload);

    return { access_token: token };
  }
}
