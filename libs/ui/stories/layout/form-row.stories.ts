import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonWrapperComponent, EAlign, FormRowComponent } from '@libs/ui';

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
        <label style="margin-right: 16px; min-width: 100px;">Email:</label>
        <input type="email" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
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
        <label style="margin-right: 16px; min-width: 100px;">Full Name:</label>
        <input type="text" placeholder="First" style="margin-right: 8px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        <input type="text" placeholder="Last" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        <button-wrapper style="margin-left: 8px;" title="Verify" variant="flat"></button-wrapper>
      </ui-form-row>
    `,
  }),
};
