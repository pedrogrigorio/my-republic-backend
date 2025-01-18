import { Controller, Param, Patch, Post, Body, Get } from '@nestjs/common';
import { GetAllNotificationsUseCase } from '../../application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from '../../application/use-cases/get-notification-by-id.usecase';
import { CreateNotificationUseCase } from '../../application/use-cases/create-notification.usecase';
import { CreateNotificationDto } from '../../application/dtos/create-notification.dto';
import { GetUnreadCountUseCase } from '../../application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from '../../application/use-cases/mark-all-as-read.usecase';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.usecase';
import { CurrentUserId } from '@src/core/decorators/current-user-id.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(
    private getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private createNotificationUseCase: CreateNotificationUseCase,
    private getUnreadCountUseCase: GetUnreadCountUseCase,
    private markAllAsReadUseCase: MarkAllAsReadUseCase,
    private markAsReadUseCase: MarkAsReadUseCase,
  ) {}

  @Get()
  async getAllNotifications(@CurrentUserId() userId: number) {
    return this.getAllNotificationsUseCase.execute(userId);
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUserId() userId: number) {
    return await this.getUnreadCountUseCase.execute(userId);
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notificationId = parseInt(id);

    return this.getNotificationByIdUseCase.execute(notificationId);
  }

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    await this.createNotificationUseCase.execute(createNotificationDto);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    const notificationId = parseInt(id);

    await this.markAsReadUseCase.execute(notificationId);
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUserId() userId: number) {
    await this.markAllAsReadUseCase.execute(userId);
  }
}
