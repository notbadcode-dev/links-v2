import { IconCircleComponent } from '@libs/components';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IconCircleComponent> = {
  title: 'UI Components/IconCircle',
  component: IconCircleComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ui-icon-circle>
          <span style="font-size: 24px;">👤</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span style="font-size: 24px;">📧</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span style="font-size: 24px;">🔒</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span style="font-size: 24px;">⚙️</span>
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
        <span style="font-size: 32px;">✨</span>
      </ui-icon-circle>
    `,
  }),
};

export const WithText: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-icon-circle>
          <span style="font-size: 24px;">✅</span>
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
      <div style="display: flex; gap: 16px; align-items: center;">
        <ui-icon-circle>
          <span style="font-size: 16px;">🔔</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span style="font-size: 24px;">🔔</span>
        </ui-icon-circle>
        <ui-icon-circle>
          <span style="font-size: 32px;">🔔</span>
        </ui-icon-circle>
      </div>
    `,
  }),
};
