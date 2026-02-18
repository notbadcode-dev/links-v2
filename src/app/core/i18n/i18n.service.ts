import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { ILanguage, TTranslationParams, TTranslationPath } from './i18n.types';

/**
 * I18n Service Wrapper
 *
 * Encapsulates the translation library implementation to provide a consistent
 * interface across the application. This allows for easy switching between
 * translation libraries in the future.
 */
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  /**
   * Available languages in the application
   */
  public readonly availableLanguages: ILanguage[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
  private readonly _translocoService: TranslocoService = inject(TranslocoService);

  /**
   * Get the currently active language
   */
  public get currentLanguage(): string {
    return this._translocoService.getActiveLang();
  }

  /**
   * Get current language as Language object
   */
  public get currentLanguageInfo(): ILanguage {
    const current = this.currentLanguage;
    return (
      this.availableLanguages.find((lang) => lang.code === current) ?? this.availableLanguages[0]
    );
  }

  /**
   * Observable of active language changes
   */
  public get langChanges$(): Observable<string> {
    return this._translocoService.langChanges$;
  }

  /**
   * Check if the translation system is ready
   */
  public get isReady(): boolean {
    const isLangLoaded = this._translocoService.isLangLoaded as (language: string) => boolean;
    return isLangLoaded(this.currentLanguage);
  }

  /**
   * Set the active language
   * @param langCode Language code to set as active
   */
  public setLanguage(langCode: string): void {
    if (this.availableLanguages.some((lang) => lang.code === langCode)) {
      this._translocoService.setActiveLang(langCode);
    } else {
      console.warn(`Language '${langCode}' is not available`);
    }
  }

  /**
   * Translate a key immediately (synchronous)
   * @param key Translation key path
   * @param params Optional parameters for interpolation
   * @param scope Optional scope to use
   */
  public translate(key: TTranslationPath, params?: TTranslationParams, scope?: string): string {
    return this._translocoService.translate(key, params, scope);
  }

  /**
   * Translate a key and return an observable (asynchronous)
   * @param key Translation key path
   * @param params Optional parameters for interpolation
   * @param scope Optional scope to use
   */
  public translate$(
    key: TTranslationPath,
    params?: TTranslationParams,
    scope?: string,
  ): Observable<string> {
    return this._translocoService.selectTranslate(key, params, scope);
  }

  /**
   * Check if a translation key exists
   * @param key Translation key path
   * @param scope Optional scope to check in
   */
  public hasKey(key: TTranslationPath, scope?: string): boolean {
    try {
      const translation = this.translate(key, {}, scope);
      return translation !== key && translation.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get multiple translations at once
   * @param keys Array of translation keys
   * @param scope Optional scope to use
   */
  public translateMultiple(keys: TTranslationPath[], scope?: string): Record<string, string> {
    const result: Record<string, string> = {};
    keys.forEach((key) => {
      result[key] = this.translate(key, {}, scope);
    });
    return result;
  }

  /**
   * Load a scope dynamically
   * @param scope Scope name to load
   */
  public loadScope(scope: string): Observable<unknown> {
    return this._translocoService.load(scope);
  }
}
