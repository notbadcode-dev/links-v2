export const LOGIN_CONSTANTS = {
  FORM: {
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
} as const;
