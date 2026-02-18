import { AUTH_KEYS_PREFIX } from './auth-keys.constants';

const SIGNUP_KEYS_PREFIX: string = `${AUTH_KEYS_PREFIX}.signup`;

export const SIGNUP_KEYS = {
  TITLE: `${SIGNUP_KEYS_PREFIX}.title`,
  SUBTITLE: `${SIGNUP_KEYS_PREFIX}.subtitle`,
  FORM: {
    SUBMIT_BUTTON: `${SIGNUP_KEYS_PREFIX}.form.submit_button`,
  },
  FOOTER: {
    ALREADY_HAVE_ACCOUNT: `${SIGNUP_KEYS_PREFIX}.footer.already_have_account`,
    SIGN_IN_LINK: `${SIGNUP_KEYS_PREFIX}.footer.sign_in_link`,
  },
} as const;
