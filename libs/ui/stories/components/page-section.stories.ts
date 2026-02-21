import { UiPageSectionComponent } from '@libs/components/page/page.component';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<UiPageSectionComponent> = {
  title: 'UI Components/PageSection',
  component: UiPageSectionComponent,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <ui-page-header>
        <div class="page-section-story-block">Header section slot</div>
      </ui-page-header>
      <ui-page-body>
        <div class="page-section-story-block">Body section slot</div>
      </ui-page-body>
      <ui-page-footer>
        <div class="page-section-story-block">Footer section slot</div>
      </ui-page-footer>
    `,
  }),
};

export default meta;

type TStory = StoryObj<UiPageSectionComponent>;

export const Basic: TStory = {};
