import { ENotificationType } from './notification.enum';

export interface INotification {
  id: string;
  message: string;
  type: ENotificationType;
  duration: number;
}

export interface INotificationConfig {
  message: string;
  type?: ENotificationType;
  duration?: number;
}
