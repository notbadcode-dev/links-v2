import type { Meta, StoryObj } from '@storybook/angular';

import { InlineTextComponent } from '@libs/ui';

const meta: Meta<InlineTextComponent> = {
  title: 'UI Components/InlineText',
  component: InlineTextComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <p>
        This is a paragraph with
        <ui-inline-text>inline text component</ui-inline-text>
        embedded within regular text flow. The component should blend
        <ui-inline-text>seamlessly</ui-inline-text>
        with the surrounding content.
      </p>
    `,
  }),
};

export default meta;
type TStory = StoryObj<InlineTextComponent>;

export const Basic: TStory = {};

export const MultipleParagraphs: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>
          First paragraph with
          <ui-inline-text>highlighted text</ui-inline-text>
          in the middle of the sentence.
        </p>
        <p>
          Second paragraph demonstrating how
          <ui-inline-text>multiple inline components</ui-inline-text>
          can be used in
          <ui-inline-text>different contexts</ui-inline-text>
          within the same content.
        </p>
        <p>
          Third paragraph to show consistency across
          <ui-inline-text>various implementations</ui-inline-text>.
        </p>
      </div>
    `,
  }),
};

export const InList: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <ul>
        <li>
          First item with <ui-inline-text>inline component</ui-inline-text>
        </li>
        <li>
          Second item containing <ui-inline-text>highlighted content</ui-inline-text>
        </li>
        <li>
          Third item with <ui-inline-text>more examples</ui-inline-text> of usage
        </li>
      </ul>
    `,
  }),
};
