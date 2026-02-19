import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseDirective } from '../../directives/base.directive';
import { EDropdownWrapperPosition, EDropdownWrapperTrigger } from './dropdown-wrapper.enum';

@Component({
  selector: 'dropdown-wrapper',
  templateUrl: './dropdown-wrapper.component.html',
  styleUrl: './dropdown-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatTooltipModule],
})
export class DropdownWrapperComponent extends BaseDirective {
  public readonly trigger: InputSignal<EDropdownWrapperTrigger> = input<EDropdownWrapperTrigger>(
    EDropdownWrapperTrigger.CLICK,
  );

  public readonly position: InputSignal<EDropdownWrapperPosition> = input<EDropdownWrapperPosition>(
    EDropdownWrapperPosition.BELOW,
  );

  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  public readonly customClass: InputSignal<string> = input<string>('');
  public readonly tooltip: InputSignal<string | undefined> = input<string | undefined>(undefined);

  public readonly itemSelected: OutputEmitterRef<unknown> = output<unknown>();

  public readonly EDropdownWrapperTrigger: typeof EDropdownWrapperTrigger = EDropdownWrapperTrigger;
  public readonly EDropdownWrapperPosition: typeof EDropdownWrapperPosition =
    EDropdownWrapperPosition;

  public onItemClick(item: unknown): void {
    this.itemSelected.emit(item);
  }
}
