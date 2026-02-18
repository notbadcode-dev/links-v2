import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'icon-wrapper',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon-wrapper.component.html',
  styleUrl: './icon-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconWrapperComponent {
  public readonly icon: InputSignal<string> = input.required<string>();
}
