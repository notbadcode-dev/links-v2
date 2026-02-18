import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NOTIFICATION_CONSTANTS } from '../notification.constants';
import { INotification } from '../notification.interface';

@Component({
  selector: 'notification-toast',
  standalone: true,
  imports: [MatIconModule, MatIconButton],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"notification-toast notification-toast--" + notification().type',
    role: 'alert',
  },
})
export class NotificationToastComponent {
  public readonly notification: InputSignal<INotification> = input.required<INotification>();
  public readonly dismissed: OutputEmitterRef<string> = output<string>();

  public readonly icon: Signal<string> = computed(
    () => NOTIFICATION_CONSTANTS.ICONS[this.notification().type],
  );

  public onDismiss(): void {
    this.dismissed.emit(this.notification().id);
  }
}
