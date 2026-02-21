import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '@app/core/i18n';
import { CUSTOM_ICONS_CONSTANTS } from '@app/core/icons/icons.constants';
import { ThemeService } from '@app/core/services/theme.service';

import { IconWrapperComponent } from '@libs/wrappers/icon-wrapper/icon-wrapper.component';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [IconWrapperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly _themeService: ThemeService = inject(ThemeService);
  protected readonly _i18nService: I18nService = inject(I18nService);
  protected readonly _moonIcon: string = CUSTOM_ICONS_CONSTANTS.THEME.TOGGLE;

  public toggleTheme(): void {
    this._themeService.toggleTheme();
  }

  public isLightThemeActive(): boolean {
    return !this._themeService.isDarkTheme();
  }

  public isDarkThemeActive(): boolean {
    return this._themeService.isDarkTheme();
  }

  public getToggleLabel(): string {
    return this._themeService.isDarkTheme()
      ? this._i18nService.translate('common.theme.dark')
      : this._i18nService.translate('common.theme.light');
  }
}
