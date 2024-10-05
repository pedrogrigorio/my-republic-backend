import { NotificationType } from '../../domain/enums/notification-type';
import { Notification } from '../../domain/entities/notification';
import { Recipient } from '../../domain/entities/recipient';
import {
  Notification as RawNotification,
  User as RawUser,
} from '@prisma/client';

type PrismaNotification = RawNotification & {
  recipient: RawUser;
};

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): RawNotification {
    return {
      id: notification.id,
      type: notification.type,
      isRead: notification.isRead,
      message: notification.message,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    return new Notification(
      {
        message: raw.message,
        isRead: raw.isRead,
        createdAt: raw.createdAt,
        type: raw.type as NotificationType,
        recipientId: raw.recipientId,
        recipient: new Recipient(
          {
            name: raw.recipient.name,
          },
          raw.id,
        ),
      },
      raw.id,
    );
  }
}
