import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-form-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent {
  @Output() public readonly formSubmit: EventEmitter<void> = new EventEmitter<void>();

  public readonly formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
}
