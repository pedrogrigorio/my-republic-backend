import { Module } from '@nestjs/common';
import { ApplicationController } from './presentation/controllers/application.controller';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { ApplicationRepository } from './application/interfaces/application.repository.interface';
import { PrismaApplicationRepository } from './infrastructure/repositories/prisma-application.repository';
import { ApplyUseCase } from './application/use-cases/apply.usecase';
import { GetAllApplicationsUseCase } from './application/use-cases/get-all-applications.usecase';
import { AdvertisementRepository } from '../advertisement/application/interfaces/advertisement.repository.interface';
import { PrismaAdvertisementRepository } from '../advertisement/infratructure/repositories/prisma-advertisement-repository';
import { GetApplicationsByUserUseCase } from './application/use-cases/get-applications-by-user.usecase';
import { DeleteApplicationUseCase } from './application/use-cases/delete-applications.usecase';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    ApplyUseCase,
    PrismaService,
    DeleteApplicationUseCase,
    GetAllApplicationsUseCase,
    GetApplicationsByUserUseCase,
    {
      provide: ApplicationRepository,
      useClass: PrismaApplicationRepository,
    },
    {
      provide: AdvertisementRepository,
      useClass: PrismaAdvertisementRepository,
    },
  ],
})
export class ApplicationModule {}
