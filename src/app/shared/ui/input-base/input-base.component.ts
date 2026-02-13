import { Directive, input, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class InputBaseComponent<T = string> implements ControlValueAccessor {
  // Common inputs for all input components
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  readonly icon = input<string>();
  readonly hint = input<string>();
  readonly errorMessage = input<string>();
  readonly tabindex = input<number | undefined>(undefined);

  // Internal state
  readonly value = signal<T | null>(null);
  readonly isDisabled = signal<boolean>(false);

  protected _onChange: (value: T | null) => void = () => {};
  protected _onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  public writeValue(value: T | null): void {
    this.value.set(value ?? null);
  }

  public registerOnChange(fn: (value: T | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // Common methods
  public onChange(value: T | null): void {
    this.value.set(value);
    this._onChange(value);
  }

  public onBlur(): void {
    this._onTouched();
  }
}
