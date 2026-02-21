import { IconCircleComponent } from '@libs/components';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IconCircleComponent> = {
  title: 'UI Components/IconCircle',
  component: IconCircleComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="icon-circle-story-row">
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">👤</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">📧</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">🔒</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">⚙️</span>
        </ui-icon-circle>
      </div>
    `,
  }),
};

export default meta;
type TStory = StoryObj<IconCircleComponent>;

export const Basic: TStory = {};

export const SingleIcon: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <ui-icon-circle>
        <span class="icon-circle-story-emoji-lg">✨</span>
      </ui-icon-circle>
    `,
  }),
};

export const WithText: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div class="icon-circle-story-row-tight">
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">✅</span>
        </ui-icon-circle>
        <span>Task completed successfully!</span>
      </div>
    `,
  }),
};

export const DifferentSizes: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div class="icon-circle-story-row">
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-sm">🔔</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-md">🔔</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span class="icon-circle-story-emoji-lg">🔔</span>
        </ui-icon-circle>
      </div>
    `,
  }),
};
