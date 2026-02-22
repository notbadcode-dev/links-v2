import { HttpErrorResponse } from '@angular/common/http';

import { getApiFailureResponseFromHttpError } from './api-error-mapper.helper';
import { API_ERROR_MAPPER_CONSTANTS } from '../constants/api-error-mapper.constants';

describe('getApiFailureResponseFromHttpError', () => {
  it('maps valid messageList preserving supported types', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: {
        code: 'AUTH_001',
        messageList: [
          { message: 'Invalid credentials', type: 'error' },
          { message: 'Try again later', type: 'warning' },
        ],
      },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.code).toBe('AUTH_001');
    expect(result.messageList).toEqual([
      { message: 'Invalid credentials', type: 'error' },
      { message: 'Try again later', type: 'warning' },
    ]);
  });

  it('falls back to default error when body is not an object', () => {
    const error = new HttpErrorResponse({
      status: 500,
      error: null,
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.messageList).toEqual([
      { type: 'error', message: API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE },
    ]);
  });

  it('maps plain message string when messageList is missing', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: { message: 'Email is required' },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.messageList).toEqual([{ type: 'error', message: 'Email is required' }]);
  });

  it('maps message array when provided', () => {
    const error = new HttpErrorResponse({
      status: 422,
      error: { message: ['Name is required', 'Password is too short'] },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.messageList).toEqual([
      { type: 'error', message: 'Name is required' },
      { type: 'error', message: 'Password is too short' },
    ]);
  });

  it('defaults to error type when messageList item has unsupported type', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: {
        code: 123,
        messageList: [{ message: 'Unsupported type', type: 'unknown' }],
      },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.code).toBeUndefined();
    expect(result.messageList).toEqual([{ type: 'error', message: 'Unsupported type' }]);
  });

  it('falls back to default message when message payload is empty after normalization', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: {
        messageList: [{ message: '   ', type: 'error' }, null],
        message: [' ', 42, ''],
      },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.messageList).toEqual([
      { type: 'error', message: API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE },
    ]);
  });

  it('falls back to default message when message is neither string nor array', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: { message: 123 },
    });

    const result = getApiFailureResponseFromHttpError(error);

    expect(result.messageList).toEqual([
      { type: 'error', message: API_ERROR_MAPPER_CONSTANTS.DEFAULT_ERROR_MESSAGE },
    ]);
  });
});
