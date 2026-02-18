import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AUTH_KEYS, COMMON_KEYS, I18nDirective, I18nPipe, I18nService } from '@app/core/i18n';
import { LanguageSelectorComponent } from '@app/shared/components/language-selector/language-selector.component';

/**
 * Example component showing different ways to use the I18n wrapper
 */
@Component({
  selector: 'i18n-example',
  standalone: true,
  templateUrl: './i18n-example.component.html',
  styleUrl: './i18n-example.component.scss',
  imports: [CommonModule, I18nDirective, I18nPipe, LanguageSelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class I18nExampleComponent {
  // Expose constants to template
  public readonly commonKeys: typeof COMMON_KEYS = COMMON_KEYS;
  public readonly authKeys: typeof AUTH_KEYS = AUTH_KEYS;

  // Examples of direct service usage
  public readonly directTranslation: string;
  public readonly translationWithParams: string;
  public readonly multipleTranslations: Record<string, string>;

  constructor(public readonly i18n: I18nService) {
    // Direct translation
    this.directTranslation = this.i18n.translate(COMMON_KEYS.ACTIONS.SAVE);

    // Translation with parameters
    this.translationWithParams = this.i18n.translate(COMMON_KEYS.VALIDATION.MIN_LENGTH, { min: 8 });

    // Multiple translations
    this.multipleTranslations = this.i18n.translateMultiple([
      COMMON_KEYS.ACTIONS.SAVE,
      COMMON_KEYS.ACTIONS.CANCEL,
      COMMON_KEYS.ACTIONS.DELETE,
    ]);
  }
}
