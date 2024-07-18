import { AppControler } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [AppControler],
  providers: [],
})
export class AppModule {}
