import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { InputPasswordWrapperComponent } from '@libs/ui';

const meta: Meta<InputPasswordWrapperComponent> = {
  title: 'UI Wrappers/InputPasswordWrapper',
  component: InputPasswordWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label text',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Make input required',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the input',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on external label',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    required: false,
  },
  render: (args) => ({
    props: {
      ...args,
      passwordControl: new FormControl(''),
    },
    template: `
      <input-password-wrapper
        [formControl]="passwordControl"
        [label]="label"
        [tooltip]="tooltip"
        [placeholder]="placeholder"
        [required]="required"
        [hint]="hint"
        [errorMessage]="errorMessage">
      </input-password-wrapper>
    `,
  }),
};

export default meta;
type TStory = StoryObj<InputPasswordWrapperComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/enter your password/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'secret-123');
    await expect(input).toHaveValue('secret-123');
  },
};

export const Required: TStory = {
  args: {
    label: 'Password',
    placeholder: 'Password is required',
    required: true,
  },
};

export const WithHint: TStory = {
  args: {
    label: 'New Password',
    placeholder: 'Create a strong password',
    hint: 'Password must be at least 8 characters long',
    tooltip: 'Debe incluir mayúsculas y números',
  },
};

export const WithError: TStory = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    errorMessage: 'Password is required',
  },
};

export const ConfirmPassword: TStory = {
  args: {
    label: 'Confirm Password',
    placeholder: 'Re-enter your password',
    hint: 'Must match the password above',
  },
};

export const Disabled: TStory = {
  tags: ['interaction'],
  render: (args) => ({
    props: {
      ...args,
      passwordControl: new FormControl({ value: '', disabled: true }),
    },
    template: `
      <input-password-wrapper
        [formControl]="passwordControl"
        [label]="label"
        [placeholder]="placeholder">
      </input-password-wrapper>
    `,
  }),
  args: {
    label: 'Password',
    placeholder: 'Password field disabled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/password field disabled/i);

    await expect(input).toBeDisabled();
  },
};

export const LongLabel: TStory = {
  args: {
    label: 'Your secure account password for authentication',
    placeholder: 'Enter password',
    hint: 'This will be used to authenticate your account access',
    tooltip: 'Información sensible',
  },
};

export const MinimalDesign: TStory = {
  args: {
    placeholder: 'Password',
    hideExternalLabel: true,
  },
};
