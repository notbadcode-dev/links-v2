import { AUTH_KEYS_PREFIX } from './auth-keys.constants';

const FORGOT_PASSWORD_KEYS_PREFIX: string = `${AUTH_KEYS_PREFIX}.forgot_password`;

export const FORGOT_PASSWORD_KEYS = {
  TITLE: `${FORGOT_PASSWORD_KEYS_PREFIX}.title`,
  SUBTITLE: `${FORGOT_PASSWORD_KEYS_PREFIX}.subtitle`,
  FORM: {
    SUBMIT_BUTTON: `${FORGOT_PASSWORD_KEYS_PREFIX}.form.submit_button`,
  },
  TOOLTIPS: {
    SUBMIT_BUTTON_OPTIONS: [
      `${FORGOT_PASSWORD_KEYS_PREFIX}.form.tooltips.submit_button.option_1`,
      `${FORGOT_PASSWORD_KEYS_PREFIX}.form.tooltips.submit_button.option_2`,
      `${FORGOT_PASSWORD_KEYS_PREFIX}.form.tooltips.submit_button.option_3`,
      `${FORGOT_PASSWORD_KEYS_PREFIX}.form.tooltips.submit_button.option_4`,
      `${FORGOT_PASSWORD_KEYS_PREFIX}.form.tooltips.submit_button.option_5`,
    ],
    BACK_TO_LOGIN: `${FORGOT_PASSWORD_KEYS_PREFIX}.footer.tooltips.back_to_login`,
  },
  MESSAGES: {
    SUCCESS: `${FORGOT_PASSWORD_KEYS_PREFIX}.messages.success`,
    FAILED: `${FORGOT_PASSWORD_KEYS_PREFIX}.messages.failed`,
  },
  FOOTER: {
    REMEMBERED_PASSWORD: `${FORGOT_PASSWORD_KEYS_PREFIX}.footer.remembered_password`,
    BACK_TO_LOGIN: `${FORGOT_PASSWORD_KEYS_PREFIX}.footer.back_to_login`,
  },
} as const;
