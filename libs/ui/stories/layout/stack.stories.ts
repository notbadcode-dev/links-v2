import { StackComponent } from '@libs/components';
import { EAlign, ESpacing } from '@libs/enums';

import type { Meta, StoryObj } from '@storybook/angular';

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
        <div class="stack-story-item stack-story-item--1">Item 1</div>
        <div class="stack-story-item stack-story-item--2">Item 2</div>
        <div class="stack-story-item stack-story-item--3">Item 3</div>
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
