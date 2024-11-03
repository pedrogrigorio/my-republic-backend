import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification-repository';
import { GetAllNotificationsUseCase } from './application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from './application/use-cases/get-notification-by-id.usecase';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.usecase';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationRepository } from './application/interfaces/notification.repository.interface';
import { GetUnreadCountUseCase } from './application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from './application/use-cases/mark-all-as-read.usecase';
import { MarkAsReadUseCase } from './application/use-cases/mark-as-read.usecase';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [CreateNotificationUseCase],
  controllers: [NotificationController],
  providers: [
    GetAllNotificationsUseCase,
    GetNotificationByIdUseCase,
    CreateNotificationUseCase,
    GetUnreadCountUseCase,
    MarkAllAsReadUseCase,
    MarkAsReadUseCase,
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class NotificationModule {}
