import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ButtonWrapperComponent, EButtonWrapperColor, EButtonWrapperVariant } from '@libs/ui';

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
    tooltip: 'Add to favorites',
  },
};
