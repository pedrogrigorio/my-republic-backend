import { NotificationType } from '../../domain/enums/notification-type';

export class NotificationResponseDto {
  id: number;
  message: string;
  isRead: boolean;
  type: NotificationType;
  createdAt: Date;
  recipient: {
    id: number;
    name: string;
  };
}
