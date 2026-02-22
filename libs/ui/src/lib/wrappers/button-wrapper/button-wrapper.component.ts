import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BaseDirective } from '@libs/directives';
import { DISABLE_ON_LOADING } from '@libs/tokens';

import { ButtonWrapperBaseDirective } from './button-wrapper.directive';
import { EButtonWrapperColor, EButtonWrapperVariant } from './button-wrapper.enums';
import { IconWrapperComponent } from '../icon-wrapper/icon-wrapper.component';

@Component({
  selector: 'button-wrapper',
  templateUrl: './button-wrapper.component.html',
  styleUrl: './button-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    MatButtonModule,
    MatTooltipModule,
    IconWrapperComponent,
    ButtonWrapperBaseDirective,
  ],
})
export class ButtonWrapperComponent extends BaseDirective {
  public readonly title: InputSignal<string> = input.required<string>();

  public readonly tooltip: InputSignal<string | undefined> = input<string>();
  public readonly icon: InputSignal<string | undefined> = input<string>();
  public readonly svgIcon: InputSignal<string | undefined> = input<string>();
  public readonly variant: InputSignal<EButtonWrapperVariant> = input<EButtonWrapperVariant>(
    EButtonWrapperVariant.RAISED,
  );
  public readonly color: InputSignal<EButtonWrapperColor> = input<EButtonWrapperColor>(
    EButtonWrapperColor.PRIMARY,
  );
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly fullWidth: InputSignal<boolean> = input<boolean>(false);
  public readonly tabindex: InputSignal<number | undefined> = input<number | undefined>(undefined);

  public readonly clicked: OutputEmitterRef<Event> = output<Event>();

  public readonly effectiveTooltip: Signal<string> = computed(() => this.tooltip() ?? this.title());
  public readonly ariaLabel: Signal<string> = computed(() => {
    const title = this.title().trim();
    if (title.length > 0) {
      return title;
    }

    const tooltip = this.tooltip()?.trim();
    if ((tooltip?.length ?? 0) > 0) {
      return tooltip ?? 'button';
    }

    return 'button';
  });
  public readonly isDisabled: Signal<boolean> = computed(
    () => this.disabled() || this._isProcessing() || (this._disableOnLoading?.() ?? false),
  );

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;

  private readonly _disableOnLoading: Signal<boolean> | null = inject(DISABLE_ON_LOADING, {
    optional: true,
  });
  private readonly _isProcessing: WritableSignal<boolean> = signal(false);

  public handleClick(event: Event): void {
    if (this.isDisabled() || this._isProcessing()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this._isProcessing.set(true);
    this.clicked.emit(event);

    queueMicrotask(() => {
      this._isProcessing.set(false);
    });
  }
}
