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
}

const createServiceMock = (initial: INotification[]): INotificationServiceStoryMock => {
  const notifications = signal<INotification[]>(initial);

  return {
    notifications,
    dismiss: (id: string): void => {
      notifications.update((current) => current.filter((notification) => notification.id !== id));
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
      template: '<notification-container />',
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
      template: '<notification-container />',
    };
  },
};
