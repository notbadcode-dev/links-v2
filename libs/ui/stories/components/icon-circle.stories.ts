import { IconCircleComponent } from '@libs/components';

import type { Meta, StoryObj } from '@storybook/angular';

const DEFAULT_ICONS = [
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
  'theme-toggle-animated',
  'brand-bookmark-animated',
  'brand-bookmark-outline-animated',
  'brand-bookmark-animated-s',
  'brand-bookmark-outline-animated-s',
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
  'theme-toggle-animated',
  'brand-bookmark-animated',
  'brand-bookmark-outline-animated',
  'brand-bookmark-animated-s',
  'brand-bookmark-outline-animated-s',
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
];

const meta: Meta<IconCircleComponent> = {
  title: 'UI Components/IconCircle',
  component: IconCircleComponent,
  tags: ['autodocs'],
  argTypes: {
    selectedIcon: {
      control: 'text',
      description: 'Currently selected svg icon',
    },
    icons: {
      control: 'object',
      description: 'Available svg icons rendered in the popup grid',
    },
    iconColor: {
      control: 'color',
      description: 'Color applied to trigger and options icons',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on trigger',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables icon picker trigger',
    },
    selectedIconChange: {
      action: 'selectedIconChange',
      description: 'Emits selected icon for two-way binding',
    },
    iconSelected: {
      action: 'iconSelected',
      description: 'Emits selected icon when user picks one',
    },
  },
  args: {
    selectedIcon: 'auth-user-sidebar',
    icons: DEFAULT_ICONS,
    iconColor: 'var(--ui-color-text-default)',
    tooltip: 'Select icon',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="icon-circle-story-row">
        <ui-icon-circle
          [selectedIcon]="selectedIcon"
          [icons]="icons"
          [iconColor]="iconColor"
          [tooltip]="tooltip"
          [disabled]="disabled"
          (selectedIconChange)="selectedIconChange($event)"
          (iconSelected)="iconSelected($event)"
        />
      </div>
    `,
  }),
};

export default meta;
type TStory = StoryObj<IconCircleComponent>;

export const Basic: TStory = {};

export const WarnTint: TStory = {
  args: {
    selectedIcon: 'auth-logout-button',
    icons: [
      'auth-logout-button',
      'auth-login-button',
      'auth-email-input',
      'auth-password-input',
      'theme-toggle-animated',
    ],
    iconColor: 'var(--ui-color-warn-700)',
    tooltip: 'Choose warning icon',
  },
};

export const Disabled: TStory = {
  args: {
    disabled: true,
  },
};

export const CompactList: TStory = {
  args: {
    selectedIcon: 'brand-bookmark-animated',
    icons: ['brand-bookmark-animated', 'brand-bookmark-outline-animated', 'theme-toggle-animated'],
  },
};
