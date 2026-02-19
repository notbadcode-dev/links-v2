import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { CheckboxWrapperComponent } from '@libs/ui';

const meta: Meta<CheckboxWrapperComponent> = {
  title: 'UI Wrappers/CheckboxWrapper',
  component: CheckboxWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
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
  },
  args: {
    label: 'Accept terms and conditions',
    required: false,
  },
  render: (args) => ({
    props: {
      ...args,
      checkboxControl: new FormControl(false),
    },
    template: `
      <checkbox-wrapper
        [formControl]="checkboxControl"
        [label]="label"
        [required]="required"
        [hint]="hint"
        [errorMessage]="errorMessage">
      </checkbox-wrapper>
    `,
  }),
};

export default meta;
type TStory = StoryObj<CheckboxWrapperComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    label: 'I agree to the terms',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox', { name: /i agree to the terms/i });

    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
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
  tags: ['interaction'],
  render: (args) => ({
    props: {
      ...args,
      checkboxControl: new FormControl({ value: false, disabled: true }),
    },
    template: `
      <checkbox-wrapper
        [formControl]="checkboxControl"
        [label]="label">
      </checkbox-wrapper>
    `,
  }),
  args: {
    label: 'Disabled option',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox', { name: /disabled option/i });

    await expect(checkbox).toBeDisabled();
  },
};

export const PreChecked: TStory = {
  render: (args) => ({
    props: {
      ...args,
      preCheckedControl: new FormControl(true),
    },
    template: `
      <checkbox-wrapper
        [formControl]="preCheckedControl"
        [label]="label"
        [hint]="hint">
      </checkbox-wrapper>
    `,
  }),
  args: {
    label: 'Pre-checked option',
    hint: 'This checkbox starts checked',
  },
};
