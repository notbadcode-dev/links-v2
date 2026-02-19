import type { Meta, StoryObj } from '@storybook/angular';

import {
  DropdownWrapperComponent,
  EDropdownWrapperPosition,
  EDropdownWrapperTrigger,
} from '@libs/ui';

const meta: Meta<DropdownWrapperComponent> = {
  title: 'UI Wrappers/DropdownWrapper',
  component: DropdownWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: 'select',
      options: Object.values(EDropdownWrapperTrigger),
      description: 'How the dropdown is triggered',
    },
    position: {
      control: 'select',
      options: Object.values(EDropdownWrapperPosition),
      description: 'Position of the dropdown relative to trigger',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class for the trigger button',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on dropdown trigger',
    },
  },
  args: {
    trigger: EDropdownWrapperTrigger.CLICK,
    position: EDropdownWrapperPosition.BELOW,
    disabled: false,
    customClass: '',
    tooltip: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <dropdown-wrapper
        [trigger]="trigger"
        [position]="position"
        [disabled]="disabled"
        [customClass]="customClass"
        [tooltip]="tooltip"
      >
        <ng-container slot="trigger">
          🌐 Select Language
        </ng-container>

        <ng-container slot="content">
          <button class="dropdown-item">🇺🇸 English</button>
          <button class="dropdown-item active">🇪🇸 Español</button>
          <button class="dropdown-item">🇫🇷 Français</button>
        </ng-container>
      </dropdown-wrapper>
    `,
    styles: [
      `
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        cursor: pointer;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        transition: background-color 0.15s ease;
      }

      .dropdown-item:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      .dropdown-item.active {
        font-weight: 600;
        background-color: rgba(0, 0, 0, 0.08);
      }
    `,
    ],
  }),
};

export default meta;
type TStory = StoryObj<DropdownWrapperComponent>;

export const Basic: TStory = {
  args: {
    trigger: EDropdownWrapperTrigger.CLICK,
    position: EDropdownWrapperPosition.BELOW,
  },
};

export const PositionAbove: TStory = {
  args: {
    trigger: EDropdownWrapperTrigger.CLICK,
    position: EDropdownWrapperPosition.ABOVE,
  },
};

export const Disabled: TStory = {
  args: {
    disabled: true,
  },
};

export const WithIcon: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <dropdown-wrapper
        [trigger]="trigger"
        [position]="position"
        [disabled]="disabled"
        [customClass]="customClass"
        [tooltip]="tooltip"
      >
        <ng-container slot="trigger">
          <mat-icon>settings</mat-icon>
          Settings
        </ng-container>

        <ng-container slot="content">
          <button class="dropdown-item">⚙️ Preferences</button>
          <button class="dropdown-item">🎨 Theme</button>
          <button class="dropdown-item">🔐 Security</button>
          <button class="dropdown-item">📝 Profile</button>
        </ng-container>
      </dropdown-wrapper>
    `,
  }),
  args: {
    tooltip: 'Open settings options',
  },
};
