import { TokenService } from '../../application/interfaces/token.service.interface';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '../../application/dtos/payload.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: PayloadDto): string {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
