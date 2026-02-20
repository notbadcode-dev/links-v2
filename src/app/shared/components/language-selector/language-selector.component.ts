import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { I18nService, ILanguage } from '@app/core/i18n';

import { DropdownWrapperComponent, IconWrapperComponent } from '@libs/wrappers';

@Component({
  selector: 'language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  imports: [DropdownWrapperComponent, IconWrapperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  protected readonly _availableLanguages: readonly ILanguage[];
  protected readonly _currentLang: Signal<string>;

  private readonly _i18nService: I18nService = inject(I18nService);

  constructor() {
    this._availableLanguages = this._i18nService.availableLanguages as readonly ILanguage[];

    this._currentLang = toSignal(this._i18nService.langChanges$, {
      initialValue: this._i18nService.currentLanguage,
    })!;
  }

  public setLanguage(lang: string): void {
    this._i18nService.setLanguage(lang);
  }

  protected _getLanguageLabel(langCode: string): string {
    const translationKey = `language.names.${langCode}`;
    const translated = this._i18nService.translate(translationKey);
    if (translated !== translationKey) {
      return translated;
    }

    const language = this._availableLanguages.find((item) => item.code === langCode);
    return language?.name ?? 'Language';
  }
}
