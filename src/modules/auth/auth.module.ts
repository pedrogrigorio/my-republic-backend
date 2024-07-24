import { ValidateUserUseCase } from './application/use-cases/validate-user.usecase';
import { JwtTokenService } from './infrastrucutre/services/jwt-token-service';
import { AuthController } from './presentation/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastrucutre/strategies/local.strategy';
import { TokenService } from './application/interfaces/token.service.interface';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtStrategy } from './infrastrucutre/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { HashingService } from '@src/core/services/hashing/hashing.service.interface';
import { BCryptHashingService } from '@src/core/services/hashing/bcrypt-hashing.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
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
    {
      provide: HashingService,
      useClass: BCryptHashingService,
    },
  ],
})
export class AuthModule {}
