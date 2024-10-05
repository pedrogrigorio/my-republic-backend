import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { Injectable } from '@nestjs/common';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class GetAllNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(recipientId: number) {
    const notifications =
      await this.notificationRepository.findAll(recipientId);

    return notifications.map((notification) =>
      NotificationMapper.toDto(notification),
    );
  }
}
