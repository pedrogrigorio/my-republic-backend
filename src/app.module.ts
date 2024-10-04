import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { ConfigModule } from '@nestjs/config';
import { AppControler } from './app.controller';
import { JwtAuthGuard } from './modules/auth/infrastrucutre/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AdvertisementModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppControler],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
