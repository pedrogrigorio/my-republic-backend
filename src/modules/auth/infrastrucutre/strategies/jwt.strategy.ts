import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUserDto> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      genre: undefined,
      imgSrc: undefined,
    };
  }
}
