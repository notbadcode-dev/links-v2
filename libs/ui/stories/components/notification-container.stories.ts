import { signal, type WritableSignal } from '@angular/core';
import { expect, userEvent, within } from 'storybook/test';

import {
  ENotificationType,
  type INotification,
  NotificationContainerComponent,
  NotificationService,
} from '@libs/components/notification';

import type { Meta, StoryObj } from '@storybook/angular';

interface INotificationServiceStoryMock {
  notifications: WritableSignal<INotification[]>;
  dismiss: (id: string) => void;
  reset: () => void;
}

const createServiceMock = (initial: INotification[]): INotificationServiceStoryMock => {
  const notifications = signal<INotification[]>(initial);
  const initialSnapshot = initial.map((notification) => ({ ...notification }));

  return {
    notifications,
    dismiss: (id: string): void => {
      notifications.update((current) => current.filter((notification) => notification.id !== id));
    },
    reset: (): void => {
      notifications.set(initialSnapshot.map((notification) => ({ ...notification })));
    },
  };
};

const meta: Meta<NotificationContainerComponent> = {
  title: 'UI Components/Notifications/NotificationContainer',
  component: NotificationContainerComponent,
  tags: ['autodocs'],
};

export default meta;

type TStory = StoryObj<NotificationContainerComponent>;

export const MultipleToasts: TStory = {
  tags: ['interaction'],
  render: () => {
    const serviceMock = createServiceMock([
      {
        id: 'n-success',
        message: 'Profile saved',
        type: ENotificationType.SUCCESS,
        duration: 5000,
      },
      {
        id: 'n-info',
        message: 'Sync started',
        type: ENotificationType.INFO,
        duration: 5000,
      },
    ]);

    return {
      moduleMetadata: {
        providers: [{ provide: NotificationService, useValue: serviceMock }],
      },
      props: {
        resetToasts: () => {
          serviceMock.reset();
        },
      },
      template: `
        <div class="notification-container-story-demo">
          <button class="notification-container-story-reset" type="button" (click)="resetToasts()">
            Regenerar toasts
          </button>
          <notification-container />
        </div>
      `,
      styles: [
        `
          .notification-container-story-demo {
            position: relative;
            min-height: 180px;
            width: 100%;
            overflow: visible;
          }

          .notification-container-story-reset {
            margin-bottom: 12px;
            border: 1px solid var(--ui-border-subtle);
            background: var(--ui-color-surface);
            color: var(--ui-color-text);
            border-radius: var(--ui-radius-sm);
            padding: 8px 12px;
            cursor: pointer;
          }

          .notification-container-story-reset:hover {
            background: var(--ui-color-surface-alt);
          }

          .notification-container-story-demo notification-container {
            position: absolute !important;
            left: 50% !important;
            bottom: 0 !important;
            transform: translateX(-50%) !important;
          }
        `,
      ],
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/profile saved/i)).toBeVisible();
    await expect(canvas.getByText(/sync started/i)).toBeVisible();

    const closeButtons = await canvas.findAllByRole('button');
    const firstCloseButton = closeButtons[0];
    await expect(firstCloseButton).toBeDefined();

    if (!firstCloseButton) {
      return;
    }

    await userEvent.click(firstCloseButton);

    await expect(canvas.queryByText(/profile saved/i)).not.toBeInTheDocument();
  },
};

export const SingleWarningToast: TStory = {
  render: () => {
    const serviceMock = createServiceMock([
      {
        id: 'n-warning',
        message: 'You are close to your storage limit',
        type: ENotificationType.WARNING,
        duration: 5000,
      },
    ]);

    return {
      moduleMetadata: {
        providers: [{ provide: NotificationService, useValue: serviceMock }],
      },
      props: {
        resetToasts: () => {
          serviceMock.reset();
        },
      },
      template: `
        <div class="notification-container-story-demo">
          <button class="notification-container-story-reset" type="button" (click)="resetToasts()">
            Regenerar toasts
          </button>
          <notification-container />
        </div>
      `,
      styles: [
        `
          .notification-container-story-demo {
            position: relative;
            min-height: 180px;
            width: 100%;
            overflow: visible;
          }

          .notification-container-story-reset {
            margin-bottom: 12px;
            border: 1px solid var(--ui-border-subtle);
            background: var(--ui-color-surface);
            color: var(--ui-color-text);
            border-radius: var(--ui-radius-sm);
            padding: 8px 12px;
            cursor: pointer;
          }

          .notification-container-story-reset:hover {
            background: var(--ui-color-surface-alt);
          }

          .notification-container-story-demo notification-container {
            position: absolute !important;
            left: 50% !important;
            bottom: 0 !important;
            transform: translateX(-50%) !important;
          }
        `,
      ],
    };
  },
};
