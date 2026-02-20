import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';

import { I18nDirective, I18nService, ILanguage } from '@app/core/i18n';
import { ThemeService } from '@app/core/services/theme.service';

import { InlineTextComponent } from '@libs/components';
import { DropdownWrapperComponent, IconWrapperComponent } from '@libs/wrappers';

type TThemePreferenceOption = 'light' | 'dark';

@Component({
  selector: 'preferences-menu',
  standalone: true,
  templateUrl: './preferences-menu.component.html',
  styleUrl: './preferences-menu.component.scss',
  imports: [I18nDirective, DropdownWrapperComponent, IconWrapperComponent, InlineTextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesMenuComponent {
  protected readonly _themeService: ThemeService = inject(ThemeService);
  protected readonly _i18nService: I18nService = inject(I18nService);
  protected readonly _availableLanguages: ILanguage[] = this._i18nService.availableLanguages;
  protected readonly _currentLanguage: Signal<string> = this._i18nService.currentLanguageSignal;
  protected readonly _themeOptions: ReadonlyArray<{
    value: TThemePreferenceOption;
    icon: string;
    labelKey: string;
  }> = [
    { value: 'light', icon: 'eco', labelKey: 'common.theme.light' },
    { value: 'dark', icon: 'contrast', labelKey: 'common.theme.dark' },
  ];

  public setLanguage(langCode: string): void {
    this._i18nService.setLanguage(langCode);
  }

  public setThemePreference(preference: TThemePreferenceOption): void {
    this._themeService.setTheme(preference);
  }

  public isThemePreferenceSelected(preference: TThemePreferenceOption): boolean {
    return this._themeService.preference() === preference;
  }
}
