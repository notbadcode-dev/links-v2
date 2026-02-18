import { AUTH_KEYS_PREFIX } from './auth-keys.constants';

export const LOGIN_KEYS_PREFIX: string = `${AUTH_KEYS_PREFIX}.login`;

export const LOGIN_KEYS = {
  TITLE: `${LOGIN_KEYS_PREFIX}.title`,
  SUBTITLE: `${LOGIN_KEYS_PREFIX}.subtitle`,
  FORM: {
    REMEMBER_ME: `${LOGIN_KEYS_PREFIX}.form.remember_me`,
    FORGOT_PASSWORD: `${LOGIN_KEYS_PREFIX}.form.forgot_password`,
    SUBMIT_BUTTON: `${LOGIN_KEYS_PREFIX}.form.submit_button`,
  },
  MESSAGES: {
    SUCCESS: `${LOGIN_KEYS_PREFIX}.messages.success`,
    FAILED: `${LOGIN_KEYS_PREFIX}.messages.failed`,
  },
  FOOTER: {
    NO_ACCOUNT: `${LOGIN_KEYS_PREFIX}.footer.no_account`,
    SIGN_UP_LINK: `${LOGIN_KEYS_PREFIX}.footer.sign_up_link`,
  },
} as const;
