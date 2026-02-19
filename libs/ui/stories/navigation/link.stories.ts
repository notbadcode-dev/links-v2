import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { LinkComponent } from '@libs/ui';

const meta: Meta<LinkComponent> = {
  title: 'UI Components/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  argTypes: {
    route: {
      control: 'text',
      description: 'Route path for navigation',
    },
    label: {
      control: 'text',
      description: 'Link text label',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on link',
    },
  },
  args: {
    route: '/dashboard',
    label: 'Go to Dashboard',
  },
};

export default meta;
type TStory = StoryObj<LinkComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    route: '/dashboard',
    label: 'Dashboard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: /dashboard/i });

    await expect(link).toBeVisible();
    await userEvent.click(link);
    await expect(link).toHaveAttribute('href');
  },
};

export const LongLabel: TStory = {
  args: {
    route: '/user/profile/settings',
    label: 'Go to User Profile Settings',
  },
};

export const ExternalStyleRoute: TStory = {
  args: {
    route: '/external-link',
    label: 'External Link Example',
    tooltip: 'Opens internal external-link route',
  },
};

export const HomeLink: TStory = {
  args: {
    route: '/',
    label: 'Home',
  },
};

export const LoginLink: TStory = {
  args: {
    route: '/auth/login',
    label: 'Sign In',
  },
};
