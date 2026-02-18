// Translation configuration types
export interface II18nConfig {
  defaultLang: string;
  fallbackLang: string;
  availableLangs: string[];
  logMissingKeys?: boolean;
}

// Translation key path types
export type TTranslationPath = string;
export type TTranslationParamValue = string | number | boolean | null | undefined;
export type TTranslationParams = Record<string, TTranslationParamValue>;

// Scope configuration
export interface IScopeConfig {
  scope: string;
  loader?: unknown;
}

// Language definition
export interface ILanguage {
  code: string;
  name: string;
  flag?: string;
}
