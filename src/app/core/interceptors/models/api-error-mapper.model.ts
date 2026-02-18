import { ApiResponseMessageModel } from '@api/auth/models/api-response-message-model';
import { NotificationService } from '@libs/ui';

export type TNotificationMethod = keyof Pick<NotificationService, 'success' | 'warning' | 'info' | 'error'>;

export interface ApiFailureResponse {
  success: false;
  data: null;
  messageList: ApiResponseMessageModel[];
  code?: string;
}
