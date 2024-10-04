import { Module } from '@nestjs/common';
import { NotificationController } from './presentation/controllers/notification.controller';
import { PrismaService } from '@src/core/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [PrismaService],
})
export class NotificationModule {}
