import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastrucutre/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { LoginUseCase } from './application/use-cases/login-use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastrucutre/strategies/jwt.strategy';
import { TokenService } from './application/interfaces/token.service.interface';
import { JwtTokenService } from './infrastrucutre/services/jwt-token-service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ValidateUserUseCase,
    LoginUseCase,
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}
