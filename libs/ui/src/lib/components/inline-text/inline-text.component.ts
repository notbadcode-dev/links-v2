import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-inline-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inline-text.component.html',
  styleUrl: './inline-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineTextComponent {}
