import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  WritableSignal,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { I18nService, ILanguage } from '@app/core/i18n';

import { EMenuSurfaceLayout, MenuSurfaceComponent, UiMenuOptionDirective } from '@libs/components';
import { IconWrapperComponent } from '@libs/wrappers/icon-wrapper/icon-wrapper.component';

@Component({
  selector: 'language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  imports: [IconWrapperComponent, MenuSurfaceComponent, UiMenuOptionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  protected readonly _menuSurfaceLayoutEnum: typeof EMenuSurfaceLayout = EMenuSurfaceLayout;
  protected readonly _availableLanguages: readonly ILanguage[];
  protected readonly _currentLang: Signal<string>;
  protected readonly _isMenuOpen: WritableSignal<boolean> = signal(false);

  private readonly _i18nService: I18nService = inject(I18nService);

  constructor() {
    this._availableLanguages = this._i18nService.availableLanguages;

    this._currentLang = toSignal(this._i18nService.langChanges$, {
      initialValue: this._i18nService.currentLanguage,
    })!;
  }

  @HostListener('document:click')
  public onDocumentClick(): void {
    this._isMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this._isMenuOpen.set(false);
  }

  public setLanguage(lang: string): void {
    this._i18nService.setLanguage(lang);
  }

  public toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this._isMenuOpen.update((isOpen) => !isOpen);
  }

  public selectLanguage(langCode: string, event: MouseEvent): void {
    event.stopPropagation();
    this.setLanguage(langCode);
    this._isMenuOpen.set(false);
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
