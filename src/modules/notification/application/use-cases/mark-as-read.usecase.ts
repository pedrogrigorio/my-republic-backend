import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { NotificationNotFoundException } from '../../domain/exceptions/notification-not-found.exception';

@Injectable()
export class MarkAsReadUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(recipientId: number) {
    const existingNotification =
      await this.notificationRepository.findById(recipientId);

    if (!existingNotification) {
      throw new NotificationNotFoundException(
        `Notification with id ${recipientId} not found`,
      );
    }

    await this.notificationRepository.markAsRead(recipientId);
  }
}
