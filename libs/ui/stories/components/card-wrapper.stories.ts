import type { Meta, StoryObj } from '@storybook/angular';

import {
  ButtonWrapperComponent,
  CardWrapperComponent,
  ECardWrapperAlignHeader,
  ECardWrapperAppearance,
} from '@libs/ui';

const meta: Meta<CardWrapperComponent> = {
  title: 'UI Wrappers/CardWrapper',
  component: CardWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    appearance: {
      control: 'select',
      options: Object.values(ECardWrapperAppearance),
      description: 'Card appearance style',
    },
    alignHeader: {
      control: 'select',
      options: Object.values(ECardWrapperAlignHeader),
      description: 'Header alignment',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
  args: {
    appearance: ECardWrapperAppearance.RAISED,
    alignHeader: ECardWrapperAlignHeader.START,
    customClass: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ButtonWrapperComponent],
    },
    template: `
      <card-wrapper
        [title]="title"
        [subtitle]="subtitle"
        [appearance]="appearance"
        [alignHeader]="alignHeader"
        [customClass]="customClass">
        <div style="padding: 16px;">
          <p>This is the card content area. You can put any content here, including text, images, forms, or other components.</p>
          <div style="display: flex; gap: 8px;">
            <button-wrapper title="Primary Action"></button-wrapper>
            <button-wrapper title="Secondary Action" variant="stroked"></button-wrapper>
          </div>
        </div>
      </card-wrapper>
    `,
  }),
};

export default meta;
type TStory = StoryObj<CardWrapperComponent>;

export const Basic: TStory = {
  args: {
    title: 'Basic Card',
    subtitle: 'This is a simple card example',
  },
};

export const WithoutSubtitle: TStory = {
  args: {
    title: 'Card Without Subtitle',
  },
};

export const OutlinedCard: TStory = {
  args: {
    title: 'Outlined Card',
    subtitle: 'This card has an outlined appearance',
    appearance: ECardWrapperAppearance.OUTLINED,
  },
};

export const FilledCard: TStory = {
  args: {
    title: 'Filled Card',
    subtitle: 'This card has a filled appearance',
    appearance: ECardWrapperAppearance.FILLED,
  },
};

export const CenterAligned: TStory = {
  args: {
    title: 'Center Aligned Header',
    subtitle: 'Header content is center aligned',
    alignHeader: ECardWrapperAlignHeader.CENTER,
  },
};

export const EndAligned: TStory = {
  args: {
    title: 'End Aligned Header',
    subtitle: 'Header content is end aligned',
    alignHeader: ECardWrapperAlignHeader.END,
  },
};

export const WithCustomClass: TStory = {
  args: {
    title: 'Card with Custom Class',
    subtitle: 'This card has a custom CSS class applied',
    customClass: 'custom-card-style',
  },
};
