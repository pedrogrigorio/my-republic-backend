import { Controller, Get } from '@nestjs/common';

@Controller('notifications')
export class NotificationController {
  constructor() {}

  @Get()
  async getAllNotifications() {}
}
