import { NotificationResponseDto } from '../dtos/notification-response.dto';
import { Notification } from '../../domain/entities/notification';

export class NotificationMapper {
  static toDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.id,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      recipient: {
        id: notification.recipient.id,
        name: notification.recipient.name,
      },
      type: notification.type,
    };
  }
}
