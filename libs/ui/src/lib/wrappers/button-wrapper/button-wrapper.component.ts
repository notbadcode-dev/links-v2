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
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonWrapperBaseDirective } from './button-wrapper.directive';
import { EButtonWrapperColor, EButtonWrapperVariant } from './button-wrapper.enum';

import { BaseDirective } from '../../directives/base.directive';
import { DISABLE_ON_LOADING } from '../../tokens/disable-on-loading.token';

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
    MatIconModule,
    ButtonWrapperBaseDirective,
  ],
})
export class ButtonWrapperComponent extends BaseDirective {
  public readonly title: InputSignal<string> = input.required<string>();

  public readonly tooltip: InputSignal<string | undefined> = input<string>();
  public readonly icon: InputSignal<string | undefined> = input<string>();
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
