import { ICONS_CONSTANTS } from '@app/constants/icons.constants';

export const AUTH_CONSTANTS = {
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
  },
  MOCK_DELAY: 1500,
  ROUTES: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    DASHBOARD: '/dashboard',
  },
  SHARED: {
    EMAIL: {
      LABEL: 'Email Address',
      PLACEHOLDER: 'name@company.com',
      ICON: ICONS_CONSTANTS.AUTH.EMAIL,
    },
    PASSWORD: {
      LABEL: 'Password',
      PLACEHOLDER: '••••••••',
      ICON: ICONS_CONSTANTS.AUTH.PASSWORD,
    },
    ERROR_MESSAGES: {
      EMAIL_REQUIRED: 'El email es requerido',
      EMAIL_INVALID: 'Ingresa un email válido',
      PASSWORD_REQUIRED: 'La contraseña es requerida',
      PASSWORD_MIN_LENGTH: 'Mínimo 6 caracteres',
      NAME_REQUIRED: 'El nombre es requerido',
    },
  },
} as const;
