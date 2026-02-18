
export interface II18nConfig {
  defaultLang: string;
  fallbackLang: string;
  availableLangs: string[];
  logMissingKeys?: boolean;
}

export type TTranslationPath = string;
export type TTranslationParamValue = string | number | boolean | null | undefined;
export type TTranslationParams = Record<string, TTranslationParamValue>;

export interface IScopeConfig {
  scope: string;
  loader?: unknown;
}

export interface ILanguage {
  code: string;
  name: string;
  flag?: string;
}
