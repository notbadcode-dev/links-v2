import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { I18nService } from '@app/core/i18n';
import { ButtonWrapperComponent, DropdownWrapperComponent, IconWrapperComponent } from '@libs/ui';

@Component({
  selector: 'language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  imports: [
    CommonModule,
    ButtonWrapperComponent,
    DropdownWrapperComponent,
    IconWrapperComponent,
  ] as const satisfies readonly Type<unknown>[],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  constructor(public readonly i18nService: I18nService) {}

  public setLanguage(lang: string): void {
    this.i18nService.setLanguage(lang);
  }
}
