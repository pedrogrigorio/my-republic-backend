import { Controller, Param, Patch, Post, Body, Get } from '@nestjs/common';
import { GetAllNotificationsUseCase } from '../../application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from '../../application/use-cases/get-notification-by-id.usecase';
import { CurrentUser } from '@src/core/decorators/current-user.decorator';
import { AuthUserDto } from '@src/modules/auth/application/dtos/auth-user.dto';
import { GetUnreadCountUseCase } from '../../application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from '../../application/use-cases/mark-all-as-read.usecase';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.usecase';

@Controller('notifications')
export class NotificationController {
  constructor(
    private getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private getUnreadCountUseCase: GetUnreadCountUseCase,
    private markAllAsReadUseCase: MarkAllAsReadUseCase,
    private markAsReadUseCase: MarkAsReadUseCase,
  ) {}

  @Get()
  async getAllNotifications(@CurrentUser() user: AuthUserDto) {
    const { id } = user;

    return this.getAllNotificationsUseCase.execute(id);
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notificationId = parseInt(id);

    return this.getNotificationByIdUseCase.execute(notificationId);
  }

  @Post()
  async createNotification(@Body() createNotificationDto: any) {}

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: AuthUserDto) {
    return this.getUnreadCountUseCase.execute(user.id);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    const notificationId = parseInt(id);

    await this.markAsReadUseCase.execute(notificationId);
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUser() user: AuthUserDto) {
    await this.markAllAsReadUseCase.execute(user.id);
  }
}
