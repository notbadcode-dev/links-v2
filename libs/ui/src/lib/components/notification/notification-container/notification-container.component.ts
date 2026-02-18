import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';

import { NotificationService } from '../notification.service';
import { INotification } from '../notification.interface';
import { NotificationToastComponent } from '../notification-toast';

@Component({
  selector: 'notification-container',
  standalone: true,
  imports: [NotificationToastComponent],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationContainerComponent {
  public readonly notifications: Signal<INotification[]>;

  private readonly _notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.notifications = this._notificationService.notifications;
  }

  public onDismiss(id: string): void {
    this._notificationService.dismiss(id);
  }
}
