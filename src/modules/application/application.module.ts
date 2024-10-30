import { Module } from '@nestjs/common';
import { ApplicationController } from './presentation/controllers/application.controller';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { ApplicationRepository } from './application/interfaces/application.repository.interface';
import { PrismaApplicationRepository } from './infrastructure/repositories/prisma-application.repository';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    PrismaService,
    {
      provide: ApplicationRepository,
      useClass: PrismaApplicationRepository,
    },
  ],
})
export class ApplicationModule {}
