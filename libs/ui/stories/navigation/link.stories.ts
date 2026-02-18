import { RouterTestingModule } from '@angular/router/testing';
import type { Meta, StoryObj } from '@storybook/angular';

import { LinkComponent } from '@libs/ui';

const meta: Meta<LinkComponent> = {
  title: 'UI Components/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  decorators: [
    {
      moduleMetadata: {
        imports: [RouterTestingModule],
      },
    },
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
  },
  args: {
    route: '/dashboard',
    label: 'Go to Dashboard',
  },
};

export default meta;
type TStory = StoryObj<LinkComponent>;

export const Basic: TStory = {
  args: {
    route: '/dashboard',
    label: 'Dashboard',
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
