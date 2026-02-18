import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-icon-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-circle.component.html',
  styleUrl: './icon-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCircleComponent {}
