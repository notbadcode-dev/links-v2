import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseDirective } from '../../directives/base.directive';
import { ECardWrapperAlignHeader, ECardWrapperAppearance } from './card-wrapper.enum';

@Component({
  selector: 'card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
})
export class CardWrapperComponent extends BaseDirective {
  public readonly title: InputSignal<string | undefined> = input<string>();
  public readonly subtitle: InputSignal<string | undefined> = input<string>();
  public readonly appearance: InputSignal<ECardWrapperAppearance> = input<ECardWrapperAppearance>(
    ECardWrapperAppearance.RAISED,
  );
  public readonly alignHeader: InputSignal<ECardWrapperAlignHeader> =
    input<ECardWrapperAlignHeader>(ECardWrapperAlignHeader.START);
  public readonly customClass: InputSignal<string> = input<string>('');
}
