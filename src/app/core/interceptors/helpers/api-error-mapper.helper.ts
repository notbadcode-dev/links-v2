import { HttpErrorResponse } from '@angular/common/http';
import { E_API_RESPONSE_MESSAGE_TYPE } from '@api/auth/models/e-api-response-message-type-array';
import { EApiResponseMessageType } from '@api/auth/models/e-api-response-message-type';
import { ApiResponseMessageModel } from '@api/auth/models/api-response-message-model';

import { API_ERROR_MAPPER_CONSTANTS } from '../constants/api-error-mapper.constants';
import { ApiFailureResponse } from '../models/api-error-mapper.model';

export function getApiFailureResponseFromHttpError(error: HttpErrorResponse): ApiFailureResponse {
  return mapErrorBody(error);
}

function mapErrorBody(error: HttpErrorResponse): ApiFailureResponse {
  const originalBody = error.error as { code?: unknown } | null;
  const code = typeof originalBody?.code === 'string' ? originalBody.code : undefined;

  return {
    success: false,
    data: null,
    ...(code && { code }),
    messageList: getMessageList(error.error),
  };
}

function getMessageList(errorBody: unknown): ApiResponseMessageModel[] {
  if (!errorBody || typeof errorBody !== 'object') {
    return [{ type: 'error', message: API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE }];
  }

  const body = errorBody as {
    messageList?: unknown;
    message?: unknown;
  };

  if (Array.isArray(body.messageList)) {
    const mapped = body.messageList
      .map((item: unknown) => {
        if (!item || typeof item !== 'object') {
          return null;
        }

        const message = (item as { message?: unknown }).message;
        const type = (item as { type?: unknown }).type;

        if (typeof message !== 'string' || !message.trim()) {
          return null;
        }

        return {
          message,
          type: isApiMessageType(type) ? type : 'error',
        } as ApiResponseMessageModel;
      })
      .filter((item: ApiResponseMessageModel | null): item is ApiResponseMessageModel => item !== null);

    if (mapped.length > 0) {
      return mapped;
    }
  }

  const fromMessage = getMessageListFromMessage(body.message);
  if (fromMessage.length > 0) {
    return fromMessage;
  }

  return [{ type: 'error', message: API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE }];
}

function getMessageListFromMessage(message: unknown): ApiResponseMessageModel[] {
  if (typeof message === 'string' && message.trim()) {
    return [{ type: 'error', message }];
  }

  if (Array.isArray(message)) {
    const values = message
      .filter((value: unknown): value is string => typeof value === 'string')
      .map((value: string) => value.trim())
      .filter(Boolean);

    if (values.length > 0) {
      return values.map((value: string) => ({ type: 'error', message: value }));
    }
  }

  return [];
}

function isApiMessageType(value: unknown): value is EApiResponseMessageType {
  return E_API_RESPONSE_MESSAGE_TYPE.includes(value as EApiResponseMessageType);
}
