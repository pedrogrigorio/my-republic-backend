import { GetApplicationsByAdvertisementUseCase } from './application/use-cases/get-applications-by-advertisement.usecase';
import { PrismaAdvertisementRepository } from '../advertisement/infratructure/repositories/prisma-advertisement-repository';
import { GetApplicationsByUserUseCase } from './application/use-cases/get-applications-by-user.usecase';
import { PrismaApplicationRepository } from './infrastructure/repositories/prisma-application.repository';
import { GetAllApplicationsUseCase } from './application/use-cases/get-all-applications.usecase';
import { DeleteApplicationUseCase } from './application/use-cases/delete-applications.usecase';
import { RefuseApplicationUseCase } from './application/use-cases/refuse-application.usecase';
import { AcceptApplicationUseCase } from './application/use-cases/accept-application.usecase';
import { AdvertisementRepository } from '../advertisement/application/interfaces/advertisement.repository.interface';
import { ApplicationRepository } from './application/interfaces/application.repository.interface';
import { ApplicationController } from './presentation/controllers/application.controller';
import { AdvertisementModule } from '../advertisement/advertisement.module';
import { NotificationModule } from '../notification/notification.module';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { ApplyUseCase } from './application/use-cases/apply.usecase';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotificationModule, AdvertisementModule],
  controllers: [ApplicationController],
  providers: [
    ApplyUseCase,
    PrismaService,
    RefuseApplicationUseCase,
    AcceptApplicationUseCase,
    DeleteApplicationUseCase,
    GetAllApplicationsUseCase,
    GetApplicationsByUserUseCase,
    GetApplicationsByAdvertisementUseCase,
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
