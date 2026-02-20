import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InputWrapperDirective } from '@libs/wrappers/input-wrapper/input-wrapper.directive';

@Component({
  selector: 'checkbox-wrapper',
  templateUrl: './checkbox-wrapper.component.html',
  styleUrl: './checkbox-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxWrapperComponent,
      multi: true,
    },
  ],
})
export class CheckboxWrapperComponent extends InputWrapperDirective<boolean> {
  public readonly isChecked: Signal<boolean> = computed(() => this.value() === true);

  public toggle(): void {
    if (this.isDisabled()) {
      return;
    }

    this.onChange(!this.isChecked());
    this.onBlur();
  }

  public toggleFromKeyboard(event: Event): void {
    event.preventDefault();
    this.toggle();
  }
}
