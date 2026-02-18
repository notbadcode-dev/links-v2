import { Directive, HostBinding, HostListener, input, InputSignal } from '@angular/core';

import { BaseDirective } from '../../directives/base.directive';

@Directive({
  selector: '[buttonWrapperBase]',
  standalone: true,
})
export class ButtonWrapperBaseDirective extends BaseDirective {
  public readonly buttonWrapperBase: InputSignal<{
    fullWidth: () => boolean;
    isDisabled: () => boolean;
    tabindex: () => number | undefined;
    handleClick: (event: Event) => void;
  }> = input.required<{
    fullWidth: () => boolean;
    isDisabled: () => boolean;
    tabindex: () => number | undefined;
    handleClick: (event: Event) => void;
  }>();

  @HostBinding('class.full-width')
  public get fullWidth(): boolean {
    return this.buttonWrapperBase().fullWidth();
  }

  @HostBinding('disabled')
  public get disabled(): boolean {
    return this.buttonWrapperBase().isDisabled();
  }

  @HostBinding('attr.tabindex')
  public get tabindex(): number | null {
    return this.buttonWrapperBase().tabindex() ?? null;
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    this.buttonWrapperBase().handleClick(event);
  }
}
