import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastrucutre/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {}
