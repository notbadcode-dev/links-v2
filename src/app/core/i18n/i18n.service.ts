import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, map, Observable, startWith } from 'rxjs';

import { I18N_CONSTANTS } from './i18n.constants';
import { ILanguage, TTranslationParams, TTranslationPath } from './i18n.types';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private static readonly _fallbackLanguage: ILanguage = I18N_CONSTANTS.DEFAULT_LANGUAGE;
  private static readonly _languageStorageKey = 'links_v2.i18n.language';
  public readonly availableLanguages: ILanguage[] = I18N_CONSTANTS.LANGUAGES;
  public readonly currentLanguageSignal: Signal<string>;
  private readonly _translocoService: TranslocoService = inject(TranslocoService);

  constructor() {
    const persistedLanguage = this._readPersistedLanguage();
    if (persistedLanguage !== null) {
      this._translocoService.setActiveLang(persistedLanguage);
    }

    const initialLanguage = this.currentLanguage;
    this.currentLanguageSignal = toSignal(
      this._translocoService.langChanges$.pipe(startWith(initialLanguage)),
      { initialValue: initialLanguage },
    );
  }

  public get currentLanguage(): string {
    return this._translocoService.getActiveLang();
  }

  public get currentLanguageInfo(): ILanguage {
    const current = this.currentLanguage;
    return (
      this.availableLanguages.find((lang) => lang.code === current) ??
      this.availableLanguages[0] ??
      I18nService._fallbackLanguage
    );
  }

  public get langChanges$(): Observable<string> {
    return this._translocoService.langChanges$;
  }

  public setLanguage(langCode: string): void {
    if (this._isAvailableLanguage(langCode)) {
      this._translocoService.setActiveLang(langCode);
      this._persistLanguage(langCode);
    }
  }

  public translate(key: TTranslationPath, params?: TTranslationParams, scope?: string): string {
    return this._translocoService.translate(key, params, scope);
  }

  public translate$(
    key: TTranslationPath,
    params?: TTranslationParams,
    scope?: string,
  ): Observable<string> {
    return this._translocoService.selectTranslate(key, params, scope);
  }

  public hasKey(key: TTranslationPath, scope?: string): boolean {
    try {
      const translation = this.translate(key, {}, scope);
      return translation !== key && translation.length > 0;
    } catch {
      return false;
    }
  }

  public translateMultiple(keys: TTranslationPath[], scope?: string): Record<string, string> {
    const result: Record<string, string> = {};
    keys.forEach((key) => {
      result[key] = this.translate(key, {}, scope);
    });
    return result;
  }

  public loadTranslations(scope?: string): Observable<unknown> {
    const language = this.currentLanguage;
    const normalizedScope = scope?.trim();

    if (normalizedScope === undefined || normalizedScope.length === 0) {
      return this._translocoService.load(language);
    }

    return forkJoin([
      this._translocoService.load(language),
      this._translocoService.load(`${normalizedScope}/${language}`),
    ]).pipe(
      map(([globalTranslation, scopeTranslation]) => ({ globalTranslation, scopeTranslation })),
    );
  }

  private _isAvailableLanguage(langCode: string): boolean {
    return this.availableLanguages.some((lang) => lang.code === langCode);
  }

  private _persistLanguage(langCode: string): void {
    try {
      globalThis.localStorage?.setItem(I18nService._languageStorageKey, langCode);
    } catch {
      // Ignore storage failures so i18n still works in restricted contexts.
    }
  }

  private _readPersistedLanguage(): string | null {
    try {
      const persistedLanguage = globalThis.localStorage?.getItem(I18nService._languageStorageKey);
      return persistedLanguage !== null && this._isAvailableLanguage(persistedLanguage)
        ? persistedLanguage
        : null;
    } catch {
      return null;
    }
  }
}
