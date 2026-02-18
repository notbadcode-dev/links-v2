import { AUTH_CONSTANTS } from './auth.constants';

export const LOGIN_CONSTANTS = {
  HEADER: {
    TITLE: 'Sign in to Bookmarks',
    SUBTITLE: 'Organize your web, one link at a time.',
  },
  FORM: {
    REMEMBER_ME_LABEL: 'Remember me',
    FORGOT_PASSWORD_LINK: 'Forgot password?',
    SUBMIT_BUTTON: 'Log In',
    EMAIL: AUTH_CONSTANTS.SHARED.EMAIL,
    PASSWORD: AUTH_CONSTANTS.SHARED.PASSWORD,
    SCHEMA: {
      email: '',
      password: '',
      rememberMe: false,
    },
    DEFAULT_VALUES: {
      EMAIL: 'one@test.com',
      PASSWORD: '123456',
      REMEMBER_ME: false,
    },
  },
  FOOTER: {
    NO_ACCOUNT: "Don't have an account?",
    CREATE_ACCOUNT_LINK: 'Create an account',
  },
  ERROR_MESSAGES: AUTH_CONSTANTS.SHARED.ERROR_MESSAGES,
  LOGS: {
    SUBMITTED: 'Login submitted:',
  },
  MESSAGES: {
    LOGIN_SUCCESS: 'Login successful! Redirecting to dashboard...',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
  },
} as const;
