// Core types and interfaces
export * from './i18n.types';

// Main service
export * from './i18n.service';

// Directives and pipes
export * from './i18n.directive';
export * from './i18n.pipe';

// Configuration providers
export * from './i18n-config.provider';

// Internal loaders (re-exported for potential future use)
export * from './transloco-loader';

// Common translation keys as constants (for type safety)
export const COMMON_KEYS = {
  ACTIONS: {
    SAVE: 'common.actions.save',
    CANCEL: 'common.actions.cancel',
    DELETE: 'common.actions.delete',
    EDIT: 'common.actions.edit',
    CLOSE: 'common.actions.close',
    SEARCH: 'common.actions.search',
    FILTER: 'common.actions.filter',
    LOAD_MORE: 'common.actions.load_more',
    BACK: 'common.actions.back',
    SUBMIT: 'common.actions.submit',
  },
  LABELS: {
    NAME: 'common.labels.name',
    EMAIL: 'common.labels.email',
    PASSWORD: 'common.labels.password',
    CONFIRM_PASSWORD: 'common.labels.confirm_password',
    DESCRIPTION: 'common.labels.description',
    CREATED_AT: 'common.labels.created_at',
    UPDATED_AT: 'common.labels.updated_at',
  },
  MESSAGES: {
    LOADING: 'common.messages.loading',
    NO_DATA: 'common.messages.no_data',
    ERROR: 'common.messages.error',
    SUCCESS: 'common.messages.success',
    CONFIRM_DELETE: 'common.messages.confirm_delete',
  },
  VALIDATION: {
    REQUIRED: 'common.validation.required',
    INVALID_EMAIL: 'common.validation.invalid_email',
    MIN_LENGTH: 'common.validation.min_length',
    MAX_LENGTH: 'common.validation.max_length',
    PASSWORDS_DONT_MATCH: 'common.validation.passwords_dont_match',
  },
} as const;

export const AUTH_KEYS = {
  LOGIN: {
    TITLE: 'auth.login.title',
    SUBTITLE: 'auth.login.subtitle',
    FORM: {
      EMAIL_LABEL: 'auth.login.form.email_label',
      EMAIL_PLACEHOLDER: 'auth.login.form.email_placeholder',
      PASSWORD_LABEL: 'auth.login.form.password_label',
      PASSWORD_PLACEHOLDER: 'auth.login.form.password_placeholder',
      REMEMBER_ME: 'auth.login.form.remember_me',
      FORGOT_PASSWORD: 'auth.login.form.forgot_password',
      SUBMIT_BUTTON: 'auth.login.form.submit_button',
    },
  },
  SIGNUP: {
    TITLE: 'auth.signup.title',
    SUBTITLE: 'auth.signup.subtitle',
    FORM: {
      NAME_LABEL: 'auth.signup.form.name_label',
      NAME_PLACEHOLDER: 'auth.signup.form.name_placeholder',
      EMAIL_LABEL: 'auth.signup.form.email_label',
      EMAIL_PLACEHOLDER: 'auth.signup.form.email_placeholder',
      PASSWORD_LABEL: 'auth.signup.form.password_label',
      PASSWORD_PLACEHOLDER: 'auth.signup.form.password_placeholder',
      SUBMIT_BUTTON: 'auth.signup.form.submit_button',
    },
    FOOTER: {
      ALREADY_HAVE_ACCOUNT: 'auth.signup.footer.already_have_account',
      SIGN_IN_LINK: 'auth.signup.footer.sign_in_link',
    },
  },
} as const;
