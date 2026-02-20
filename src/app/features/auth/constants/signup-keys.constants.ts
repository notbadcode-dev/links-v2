import { AUTH_KEYS_PREFIX } from './auth-keys.constants';

const SIGNUP_KEYS_PREFIX: string = `${AUTH_KEYS_PREFIX}.signup`;

export const SIGNUP_KEYS = {
  TITLE: `${SIGNUP_KEYS_PREFIX}.title`,
  SUBTITLE: `${SIGNUP_KEYS_PREFIX}.subtitle`,
  FORM: {
    SUBMIT_BUTTON: `${SIGNUP_KEYS_PREFIX}.form.submit_button`,
  },
  TOOLTIPS: {
    SUBMIT_BUTTON_OPTIONS: [
      `${SIGNUP_KEYS_PREFIX}.form.tooltips.submit_button.option_1`,
      `${SIGNUP_KEYS_PREFIX}.form.tooltips.submit_button.option_2`,
      `${SIGNUP_KEYS_PREFIX}.form.tooltips.submit_button.option_3`,
      `${SIGNUP_KEYS_PREFIX}.form.tooltips.submit_button.option_4`,
      `${SIGNUP_KEYS_PREFIX}.form.tooltips.submit_button.option_5`,
    ],
  },
  MESSAGES: {
    SUCCESS: `${SIGNUP_KEYS_PREFIX}.messages.success`,
    FAILED: `${SIGNUP_KEYS_PREFIX}.messages.failed`,
  },
  FOOTER: {
    ALREADY_HAVE_ACCOUNT: `${SIGNUP_KEYS_PREFIX}.footer.already_have_account`,
    SIGN_IN_LINK: `${SIGNUP_KEYS_PREFIX}.footer.sign_in_link`,
    TOOLTIPS: {
      SIGN_IN_LINK: `${SIGNUP_KEYS_PREFIX}.footer.tooltips.sign_in_link`,
    },
  },
} as const;
