import { ConfigModule } from '@nestjs/config';
import { AppControler } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppControler],
  providers: [],
})
export class AppModule {}
