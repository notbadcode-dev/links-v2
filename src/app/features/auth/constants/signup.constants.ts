import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { AUTH_CONSTANTS } from './auth.constants';

export const SIGNUP_CONSTANTS = {
  NAME: {
    LABEL: 'Full Name',
    PLACEHOLDER: 'John Doe',
    ICON: ICONS_CONSTANTS.AUTH.USER,
  },
  EMAIL: AUTH_CONSTANTS.SHARED.EMAIL,
  PASSWORD: AUTH_CONSTANTS.SHARED.PASSWORD,
  ERROR_MESSAGES: AUTH_CONSTANTS.SHARED.ERROR_MESSAGES,
  LOGS: {
    SUBMITTED: 'Signup submitted:',
  },
  FORM: {
    DEFAULT_VALUES: {
      NAME: '' as const,
      EMAIL: '' as const,
      PASSWORD: '' as const,
    },
  },
} as const;
