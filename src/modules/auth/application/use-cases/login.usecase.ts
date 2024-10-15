import { TokenService } from '../interfaces/token.service.interface';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { PayloadDto } from '../dtos/payload.interface';
import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable()
export class LoginUseCase {
  constructor(private tokenService: TokenService) {}

  async execute(authUserDto: AuthUserDto): Promise<AuthResponseDto> {
    const payload: PayloadDto = {
      sub: authUserDto.id,
      name: authUserDto.name,
      email: authUserDto.email,
      gender: authUserDto.gender,
      imgSrc: authUserDto.imgSrc,
    };

    const token = this.tokenService.generateToken(payload);

    return { user: authUserDto, access_token: token };
  }
}
