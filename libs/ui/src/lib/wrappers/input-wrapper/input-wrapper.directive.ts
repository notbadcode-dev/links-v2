import {
  computed,
  Directive,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { BaseDirective } from '../../directives/base.directive';
import { DISABLE_ON_LOADING } from '../../tokens/disable-on-loading.token';
import { IInputWrapperConfig } from './input-wrapper.types';

@Directive()
export abstract class InputWrapperDirective<
  TValue = string,
  TConfig extends IInputWrapperConfig = IInputWrapperConfig,
>
  extends BaseDirective
  implements ControlValueAccessor
{
  public readonly label: InputSignal<string | undefined> = input<string>();
  public readonly tooltip: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly hideInternalLabel: InputSignal<boolean | undefined> = input<boolean | undefined>(
    undefined,
  );
  public readonly hideExternalLabel: InputSignal<boolean | undefined> = input<boolean | undefined>(
    undefined,
  );
  public readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  public readonly required: InputSignal<boolean | undefined> = input<boolean | undefined>(
    undefined,
  );
  public readonly icon: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly hint: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly errorMessage: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  public readonly tabindex: InputSignal<number | undefined> = input<number | undefined>(undefined);

  public readonly config: InputSignal<TConfig | undefined> = input<TConfig>();

  public readonly effectiveLabel: Signal<string> = computed(
    () => this.label() ?? this.config()?.label ?? '',
  );
  public readonly effectiveTooltip: Signal<string | undefined> = computed(
    () => this.tooltip() ?? this.config()?.tooltip,
  );
  public readonly effectiveHideInternalLabel: Signal<boolean> = computed(
    () => this.hideInternalLabel() ?? this.config()?.hideInternalLabel ?? true,
  );
  public readonly effectiveHideExternalLabel: Signal<boolean> = computed(
    () => this.hideExternalLabel() ?? this.config()?.hideExternalLabel ?? false,
  );
  public readonly effectivePlaceholder: Signal<string> = computed(
    () => this.placeholder() ?? this.config()?.placeholder ?? '',
  );
  public readonly effectiveRequired: Signal<boolean> = computed(
    () => this.required() ?? this.config()?.required ?? false,
  );
  public readonly effectiveIcon: Signal<string | undefined> = computed(
    () => this.icon() ?? this.config()?.icon,
  );
  public readonly effectiveHint: Signal<string | undefined> = computed(
    () => this.hint() ?? this.config()?.hint,
  );
  public readonly effectiveErrorMessage: Signal<string | undefined> = computed(
    () => this.errorMessage() ?? this.config()?.errorMessage,
  );
  public readonly effectiveTabindex: Signal<number | undefined> = computed(
    () => this.tabindex() ?? this.config()?.tabindex,
  );

  public readonly value: WritableSignal<TValue | null> = signal<TValue | null>(null);
  public readonly isDisabled: Signal<boolean> = computed(
    () => this._formDisabled() || (this._disableOnLoading?.() ?? false),
  );

  private readonly _disableOnLoading: Signal<boolean> | null = inject(DISABLE_ON_LOADING, {
    optional: true,
  });
  private readonly _formDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public writeValue(value: TValue | null): void {
    this.value.set(value ?? null);
  }

  public registerOnChange(fn: (value: TValue | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  public onChange(value: TValue | null): void {
    this.value.set(value);
    this._onChange(value);
  }

  public onBlur(): void {
    this._onTouched();
  }

  protected _onChange: (value: TValue | null) => void = () => {};
  protected _onTouched: () => void = () => {};
}
