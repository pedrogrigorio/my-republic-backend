import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification-repository';
import { GetAllNotificationsUseCase } from './application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from './application/use-cases/get-notification-by-id.usecase';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationRepository } from './application/interfaces/notification.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    PrismaService,
    GetAllNotificationsUseCase,
    GetNotificationByIdUseCase,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class NotificationModule {}
