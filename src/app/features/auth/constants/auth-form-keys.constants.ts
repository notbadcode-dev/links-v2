import { AUTH_KEYS_PREFIX } from './auth-keys.constants';

const AUTH_FORM_KEYS_PREFIX: string = `${AUTH_KEYS_PREFIX}.form`;

export const AUTH_FORM_KEYS = {
  EMAIL: {
    LABEL: `${AUTH_FORM_KEYS_PREFIX}.email.label`,
    PLACEHOLDER: `${AUTH_FORM_KEYS_PREFIX}.email.placeholder`,
  },
  PASSWORD: {
    LABEL: `${AUTH_FORM_KEYS_PREFIX}.password.label`,
    PLACEHOLDER: `${AUTH_FORM_KEYS_PREFIX}.password.placeholder`,
  },
  NAME: {
    LABEL: `${AUTH_FORM_KEYS_PREFIX}.name.label`,
    PLACEHOLDER: `${AUTH_FORM_KEYS_PREFIX}.name.placeholder`,
  },
} as const;
