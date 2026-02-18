import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, map, Observable } from 'rxjs';
import { I18N_CONSTANTS } from './i18n.constants';
import { ILanguage, TTranslationParams, TTranslationPath } from './i18n.types';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private static readonly _fallbackLanguage: ILanguage = I18N_CONSTANTS.DEFAULT_LANGUAGE;
  public readonly availableLanguages: ILanguage[] = I18N_CONSTANTS.LANGUAGES;
  private readonly _translocoService: TranslocoService = inject(TranslocoService);

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
    if (this.availableLanguages.some((lang) => lang.code === langCode)) {
      this._translocoService.setActiveLang(langCode);
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
}
