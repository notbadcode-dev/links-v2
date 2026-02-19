import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-link',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTooltipModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  public readonly route: InputSignal<string> = input.required<string>();
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly tooltip: InputSignal<string | undefined> = input<string | undefined>(undefined);
}
