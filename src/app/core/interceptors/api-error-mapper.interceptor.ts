import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiResponseMessageModel } from '@api/auth/models/api-response-message-model';
import { NotificationService } from '@libs/ui';
import { catchError, EMPTY } from 'rxjs';

import { API_ERROR_MAPPER_CONSTANTS, NOTIFICATION_TYPE_MAP } from './constants/api-error-mapper.constants';
import { getApiFailureResponseFromHttpError } from './helpers/api-error-mapper.helper';

export function apiErrorMapperInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        notificationService.error(API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE);
        return EMPTY;
      }

      const apiFailureResponse = getApiFailureResponseFromHttpError(error);

      apiFailureResponse.messageList.forEach((messageItem: ApiResponseMessageModel) => {
        showNotificationByType(notificationService, messageItem);
      });

      return EMPTY;
    }),
  );
}

function showNotificationByType(
  notificationService: NotificationService,
  messageItem: ApiResponseMessageModel,
): void {
  const method = NOTIFICATION_TYPE_MAP[messageItem.type] ?? 'error';
  notificationService[method](messageItem.message);
}
