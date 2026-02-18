import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { NOTIFICATION_CONSTANTS } from './notification.constants';
import { ENotificationType } from './notification.enum';
import { INotification, INotificationConfig } from './notification.interface';

// Constants for ID generation
const ID_GENERATION_CONSTANTS = {
  RANDOM_STRING_BASE: 36,
  RANDOM_STRING_START_INDEX: 2,
  RANDOM_STRING_END_INDEX: 9,
  ID_SEPARATOR: '-',
} as const;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public readonly notifications: Signal<INotification[]> = computed(() =>
    this._notifications().slice(0, NOTIFICATION_CONSTANTS.MAX_VISIBLE),
  );

  private readonly _notifications: WritableSignal<INotification[]> = signal([]);
  private readonly _timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  public show(config: INotificationConfig): string {
    const notification: INotification = {
      id: this._generateId(),
      message: config.message,
      type: config.type ?? ENotificationType.INFO,
      duration: config.duration ?? NOTIFICATION_CONSTANTS.DEFAULT_DURATION,
    };

    this._notifications.update((current) => {
      const updated = [...current, notification];

      if (updated.length > NOTIFICATION_CONSTANTS.MAX_VISIBLE) {
        const oldest = updated[0];
        if (oldest) {
          this._clearTimer(oldest.id);
        }
        return updated.slice(1);
      }

      return updated;
    });

    this._startTimer(notification);

    return notification.id;
  }

  public success(message: string, duration?: number): string {
    const config: INotificationConfig = {
      message,
      type: ENotificationType.SUCCESS,
      ...(duration !== undefined && { duration }),
    };
    return this.show(config);
  }

  public error(message: string, duration?: number): string {
    const config: INotificationConfig = {
      message,
      type: ENotificationType.ERROR,
      ...(duration !== undefined && { duration }),
    };
    return this.show(config);
  }

  public warning(message: string, duration?: number): string {
    const config: INotificationConfig = {
      message,
      type: ENotificationType.WARNING,
      ...(duration !== undefined && { duration }),
    };
    return this.show(config);
  }

  public info(message: string, duration?: number): string {
    const config: INotificationConfig = {
      message,
      type: ENotificationType.INFO,
      ...(duration !== undefined && { duration }),
    };
    return this.show(config);
  }

  public dismiss(id: string): void {
    this._clearTimer(id);
    this._notifications.update((current) => current.filter((n) => n.id !== id));
  }

  private _startTimer(notification: INotification): void {
    if (notification.duration <= NOTIFICATION_CONSTANTS.IMMEDIATE_DURATION) {
      return;
    }

    const timer = setTimeout(() => {
      this.dismiss(notification.id);
    }, notification.duration);

    this._timers.set(notification.id, timer);
  }

  private _clearTimer(id: string): void {
    const timer = this._timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this._timers.delete(id);
    }
  }

  private _generateId(): string {
    const timestamp = Date.now();
    const randomPart = Math.random()
      .toString(ID_GENERATION_CONSTANTS.RANDOM_STRING_BASE)
      .substring(
        ID_GENERATION_CONSTANTS.RANDOM_STRING_START_INDEX,
        ID_GENERATION_CONSTANTS.RANDOM_STRING_END_INDEX,
      );

    return `${timestamp}${ID_GENERATION_CONSTANTS.ID_SEPARATOR}${randomPart}`;
  }
}
