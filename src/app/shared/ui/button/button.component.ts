import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'button-wrapper',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
})
export class ButtonComponent {
  readonly title = input.required<string>();

  readonly tooltip = input<string>();
  readonly icon = input<string>();
  readonly disabled = input<boolean>(false);
  readonly tabindex = input<number | undefined>(undefined);

  readonly clicked = output<Event>();

  private readonly isProcessing = signal(false);

  readonly effectiveTooltip = computed(() => this.tooltip() ?? this.title());
  readonly isDisabled = computed(() => this.disabled() || this.isProcessing());

  handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Prevent double-click
    this.isProcessing.set(true);
    this.clicked.emit(event);

    // Reset after 300ms
    setTimeout(() => {
      this.isProcessing.set(false);
    }, 300);
  }
}
