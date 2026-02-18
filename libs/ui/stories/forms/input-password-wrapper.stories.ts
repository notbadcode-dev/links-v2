import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { InputPasswordWrapperComponent } from '@libs/ui';

const meta: Meta<InputPasswordWrapperComponent> = {
  title: 'UI Wrappers/InputPasswordWrapper',
  component: InputPasswordWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    {
      moduleMetadata: {
        imports: [ReactiveFormsModule],
      },
    },
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
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input interaction',
    },
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    required: false,
    disabled: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    valueChanged: fn() as () => void,
  },
  render: (args) => ({
    props: {
      ...args,
      passwordControl: new FormControl(''),
      onValueChanged: args.valueChanged as (() => void) | undefined,
    },
    template: `
      <input-password-wrapper
        [formControl]="passwordControl"
        [label]="label"
        [placeholder]="placeholder"
        [required]="required"
        [hint]="hint"
        [errorMessage]="errorMessage"
        [disabled]="disabled"
        (valueChanged)="onValueChanged($event)">
      </input-password-wrapper>
    `,
  }),
};

export default meta;
type TStory = StoryObj<InputPasswordWrapperComponent>;

export const Basic: TStory = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
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
  args: {
    label: 'Password',
    placeholder: 'Password field disabled',
    disabled: true,
  },
};

export const LongLabel: TStory = {
  args: {
    label: 'Your secure account password for authentication',
    placeholder: 'Enter password',
    hint: 'This will be used to authenticate your account access',
  },
};

export const MinimalDesign: TStory = {
  args: {
    placeholder: 'Password',
    hideExternalLabel: true,
  },
};
