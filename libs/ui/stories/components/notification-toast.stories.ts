import { expect, fn, userEvent, within } from 'storybook/test';

import {
  ENotificationType,
  NotificationToastComponent,
  type INotification,
} from '@libs/components/notification';

import type { Meta, StoryObj } from '@storybook/angular';

const BASE_NOTIFICATION: INotification = {
  id: 'toast-1',
  message: 'Operation completed successfully',
  type: ENotificationType.SUCCESS,
  duration: 5000,
};

const meta: Meta<NotificationToastComponent> = {
  title: 'UI Components/Notifications/NotificationToast',
  component: NotificationToastComponent,
  tags: ['autodocs'],
  argTypes: {
    notification: {
      control: 'object',
      description: 'Notification data rendered by the toast',
    },
    dismissed: {
      action: 'dismissed',
      description: 'Emitted when the close button is clicked',
    },
  },
  args: {
    notification: BASE_NOTIFICATION,
    dismissed: fn() as (id: string) => void,
  },
};

export default meta;

type TStory = StoryObj<NotificationToastComponent>;

export const Success: TStory = {
  tags: ['interaction'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = await canvas.findByRole('alert');

    await expect(alert).toBeVisible();
    await expect(canvas.getByText(/operation completed successfully/i)).toBeVisible();

    const closeButton = await canvas.findByRole('button');
    await userEvent.click(closeButton);
  },
};

export const Error: TStory = {
  args: {
    notification: {
      ...BASE_NOTIFICATION,
      id: 'toast-error',
      type: ENotificationType.ERROR,
      message: 'Could not complete operation',
    },
  },
};

export const Warning: TStory = {
  args: {
    notification: {
      ...BASE_NOTIFICATION,
      id: 'toast-warning',
      type: ENotificationType.WARNING,
      message: 'Please review the highlighted fields',
    },
  },
};

export const Info: TStory = {
  args: {
    notification: {
      ...BASE_NOTIFICATION,
      id: 'toast-info',
      type: ENotificationType.INFO,
      message: 'Background sync is in progress',
    },
  },
};
