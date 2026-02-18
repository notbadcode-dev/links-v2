import type { Meta, StoryObj } from '@storybook/angular';

import { TitleComponent } from '@libs/ui';

const meta: Meta<TitleComponent> = {
  title: 'UI Components/Title',
  component: TitleComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text',
    },
  },
  args: {
    title: 'Example Title',
  },
};

export default meta;
type TStory = StoryObj<TitleComponent>;

export const Basic: TStory = {
  args: {
    title: 'Basic Title',
  },
};

export const WithSubtitle: TStory = {
  args: {
    title: 'Main Title',
    subtitle: 'This is a subtitle that provides additional context',
  },
};

export const LongTitle: TStory = {
  args: {
    title:
      'This is a very long title that demonstrates how the component handles extended text content',
    subtitle: 'And this is also a longer subtitle to show the component behavior with more text',
  },
};
