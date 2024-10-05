import { Controller, Param, Patch, Post, Body, Get } from '@nestjs/common';
import { GetAllNotificationsUseCase } from '../../application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from '../../application/use-cases/get-notification-by-id.usecase';
import { CurrentUser } from '@src/core/decorators/current-user.decorator';
import { AuthUserDto } from '@src/modules/auth/application/dtos/auth-user.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private getNotificationByIdUseCase: GetNotificationByIdUseCase,
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

  @Get('unread-count')
  async getUnreadCount() {}

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {}

  @Patch('read-all')
  async markAllAsRead() {}

  @Post()
  async createNotification(@Body() createNotificationDto: any) {}
}
