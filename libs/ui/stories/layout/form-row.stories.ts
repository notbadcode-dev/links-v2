import { FormRowComponent } from '@libs/components';
import { EAlign } from '@libs/enums';
import { ButtonWrapperComponent } from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FormRowComponent> = {
  title: 'UI Components/FormRow',
  component: FormRowComponent,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: Object.values(EAlign),
      description: 'Alignment of form row content',
    },
  },
  args: {
    align: EAlign.START,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-form-row [align]="align">
        <label for="form-row-email">Email</label>
        <input id="form-row-email" type="email" placeholder="name@example.com">
      </ui-form-row>
    `,
  }),
};

export default meta;
type TStory = StoryObj<FormRowComponent>;

export const Basic: TStory = {
  args: {
    align: EAlign.START,
  },
};

export const CenterAligned: TStory = {
  args: {
    align: EAlign.CENTER,
  },
};

export const SpaceBetween: TStory = {
  args: {
    align: EAlign.BETWEEN,
  },
};

export const WithMultipleElements: TStory = {
  args: {
    align: EAlign.START,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ButtonWrapperComponent],
    },
    template: `
      <ui-form-row [align]="align">
        <label for="form-row-first-name">First Name</label>
        <input id="form-row-first-name" type="text" placeholder="First" aria-label="First name">
        <label for="form-row-last-name">Last Name</label>
        <input id="form-row-last-name" type="text" placeholder="Last" aria-label="Last name">
        <button-wrapper title="Verify" variant="flat"></button-wrapper>
      </ui-form-row>
    `,
  }),
};
