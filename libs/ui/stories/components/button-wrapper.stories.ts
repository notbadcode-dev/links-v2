import { expect, fn, userEvent, within } from 'storybook/test';

import {
  ButtonWrapperComponent,
  EButtonWrapperColor,
  EButtonWrapperContentMode,
  EButtonWrapperVariant,
} from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ButtonWrapperComponent> = {
  title: 'UI Wrappers/ButtonWrapper',
  component: ButtonWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Button text label',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip text',
    },
    icon: {
      control: 'text',
      description: 'Material icon name',
    },
    svgIcon: {
      control: 'text',
      description: 'Registered SVG icon name',
    },
    variant: {
      control: 'select',
      options: Object.values(EButtonWrapperVariant),
      description: 'Button variant style',
    },
    color: {
      control: 'select',
      options: Object.values(EButtonWrapperColor),
      description: 'Button color theme',
    },
    contentMode: {
      control: 'select',
      options: Object.values(EButtonWrapperContentMode),
      description: 'Button content mode: icon, text or icon + text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
  },
  args: {
    title: 'Click Me',
    variant: EButtonWrapperVariant.RAISED,
    color: EButtonWrapperColor.PRIMARY,
    contentMode: EButtonWrapperContentMode.ICON_TEXT,
    disabled: false,
    fullWidth: false,

    clicked: fn() as () => void,
  },
};

export default meta;
type TStory = StoryObj<ButtonWrapperComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    title: 'Basic Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /basic button/i });

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
};

export const WithIcon: TStory = {
  args: {
    title: 'Save',
    icon: 'save',
    contentMode: EButtonWrapperContentMode.ICON_TEXT,
  },
};

export const WithTooltip: TStory = {
  args: {
    title: 'Help',
    tooltip: 'Click for help information',
    icon: 'help',
  },
};

export const FlatVariant: TStory = {
  args: {
    title: 'Flat Button',
    variant: EButtonWrapperVariant.FLAT,
  },
};

export const StrokedVariant: TStory = {
  args: {
    title: 'Stroked Button',
    variant: EButtonWrapperVariant.STROKED,
  },
};

export const BasicVariant: TStory = {
  args: {
    title: 'Basic Button',
    variant: EButtonWrapperVariant.BASIC,
  },
};

export const AccentColor: TStory = {
  args: {
    title: 'Accent Button',
    color: EButtonWrapperColor.ACCENT,
  },
};

export const WarnColor: TStory = {
  args: {
    title: 'Delete',
    color: EButtonWrapperColor.WARN,
    icon: 'delete',
  },
};

export const Disabled: TStory = {
  tags: ['interaction'],
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /disabled button/i });

    await expect(button).toBeDisabled();
  },
};

export const FullWidth: TStory = {
  args: {
    title: 'Full Width Button',
    fullWidth: true,
  },
};

export const IconOnly: TStory = {
  args: {
    title: '',
    icon: 'favorite',
    contentMode: EButtonWrapperContentMode.ICON,
    tooltip: 'Add to favorites',
  },
};

export const TextOnlyMode: TStory = {
  args: {
    title: 'Text only',
    icon: 'delete',
    contentMode: EButtonWrapperContentMode.TEXT,
  },
};

export const IconAndTextMode: TStory = {
  args: {
    title: 'Delete',
    icon: 'delete',
    contentMode: EButtonWrapperContentMode.ICON_TEXT,
    color: EButtonWrapperColor.WARN,
  },
};
