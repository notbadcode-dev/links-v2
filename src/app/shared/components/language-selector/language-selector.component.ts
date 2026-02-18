import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService, ILanguage } from '@app/core/i18n';
import { DropdownWrapperComponent, IconWrapperComponent } from '@libs/ui';

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
  protected readonly _currentLangInfo: Signal<ILanguage>;

  private readonly _i18nService: I18nService = inject(I18nService);

  constructor() {
    this._availableLanguages = this._i18nService.availableLanguages as readonly ILanguage[];

    this._currentLang = toSignal(this._i18nService.langChanges$, {
      initialValue: this._i18nService.currentLanguage,
    })!;

    this._currentLangInfo = computed((): ILanguage => this._getCurrentLanguage());
  }

  public setLanguage(lang: string): void {
    this._i18nService.setLanguage(lang);
  }

  private _getCurrentLanguage(): ILanguage {
    const currentLang = this._currentLang();
    const foundLang = this._availableLanguages.find((l: ILanguage) => l.code === currentLang);
    return foundLang || this._availableLanguages[0]!;
  }
}
