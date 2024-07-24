import { ConfigModule } from '@nestjs/config';
import { AppControler } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppControler],
  providers: [],
})
export class AppModule {}
