import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { CheckboxWrapperComponent } from '@libs/ui';

const meta: Meta<CheckboxWrapperComponent> = {
  title: 'UI Wrappers/CheckboxWrapper',
  component: CheckboxWrapperComponent,
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
      description: 'Checkbox label text',
    },
    required: {
      control: 'boolean',
      description: 'Make checkbox required',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the checkbox',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable checkbox interaction',
    },
  },
  args: {
    label: 'Accept terms and conditions',
    required: false,
    disabled: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    valueChanged: fn() as () => void,
  },
  render: (args) => ({
    props: {
      ...args,
      checkboxControl: new FormControl(false),
      onValueChanged: args.valueChanged as (() => void) | undefined,
    },
    template: `
      <checkbox-wrapper
        [formControl]="checkboxControl"
        [label]="label"
        [required]="required"
        [hint]="hint"
        [errorMessage]="errorMessage"
        [disabled]="disabled"
        (valueChanged)="onValueChanged($event)">
      </checkbox-wrapper>
    `,
  }),
};

export default meta;
type TStory = StoryObj<CheckboxWrapperComponent>;

export const Basic: TStory = {
  args: {
    label: 'I agree to the terms',
  },
};

export const Required: TStory = {
  args: {
    label: 'Required checkbox',
    required: true,
  },
};

export const WithHint: TStory = {
  args: {
    label: 'Subscribe to newsletter',
    hint: 'You can unsubscribe at any time',
  },
};

export const WithError: TStory = {
  args: {
    label: 'Accept privacy policy',
    required: true,
    errorMessage: 'You must accept the privacy policy to continue',
  },
};

export const Disabled: TStory = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const PreChecked: TStory = {
  render: (args) => ({
    props: {
      ...args,
      preCheckedControl: new FormControl(true),
      onValueChanged: args.valueChanged as () => void,
    },
    template: `
      <checkbox-wrapper
        [formControl]="preCheckedControl"
        [label]="label"
        [hint]="hint"
        (valueChanged)="onValueChanged($event)">
      </checkbox-wrapper>
    `,
  }),
  args: {
    label: 'Pre-checked option',
    hint: 'This checkbox starts checked',
  },
};
