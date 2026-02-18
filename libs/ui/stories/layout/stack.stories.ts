import type { Meta, StoryObj } from '@storybook/angular';

import { EAlign, ESpacing, StackComponent } from '@libs/ui';

const meta: Meta<StackComponent> = {
  title: 'UI Components/Stack',
  component: StackComponent,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: Object.values(EAlign),
      description: 'Alignment of stack items',
    },
    gap: {
      control: 'select',
      options: Object.values(ESpacing),
      description: 'Space between stack items',
    },
  },
  args: {
    align: EAlign.STRETCH,
    gap: ESpacing.MD,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-stack [align]="align" [gap]="gap">
        <div style="background: #f0f0f0; padding: 16px; border: 1px solid #ddd;">Item 1</div>
        <div style="background: #e0e0e0; padding: 16px; border: 1px solid #ddd;">Item 2</div>
        <div style="background: #d0d0d0; padding: 16px; border: 1px solid #ddd;">Item 3</div>
      </ui-stack>
    `,
  }),
};

export default meta;
type TStory = StoryObj<StackComponent>;

export const Basic: TStory = {
  args: {
    align: EAlign.STRETCH,
    gap: ESpacing.MD,
  },
};

export const CenterAligned: TStory = {
  args: {
    align: EAlign.CENTER,
    gap: ESpacing.LG,
  },
};

export const SmallGap: TStory = {
  args: {
    align: EAlign.START,
    gap: ESpacing.SM,
  },
};

export const LargeGap: TStory = {
  args: {
    align: EAlign.STRETCH,
    gap: ESpacing.XL,
  },
};
