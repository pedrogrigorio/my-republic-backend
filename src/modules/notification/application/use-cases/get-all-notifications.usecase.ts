import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(recipientId: number) {
    const notifications =
      await this.notificationRepository.findAll(recipientId);

    return notifications;
  }
}
