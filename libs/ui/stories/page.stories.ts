import { PageComponent } from '@libs/components';
import { EPageLayout } from '@libs/enums';
import { ButtonWrapperComponent } from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<PageComponent> = {
  title: 'UI Components/Page',
  component: PageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    layout: {
      control: 'select',
      options: Object.values(EPageLayout),
      description: 'Page layout style',
    },
  },
  args: {
    layout: EPageLayout.DEFAULT,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-page [layout]="layout">
        <ui-page-header>
          <div class="page-story-header">
            <h1>Page Header</h1>
            <p>This is the page header section</p>
          </div>
        </ui-page-header>

        <ui-page-body>
          <div class="page-story-body">
            <h2>Main Content</h2>
            <p>This is the main content area of the page. It can contain any type of content including:</p>
            <ul>
              <li>Forms and input fields</li>
              <li>Data tables and lists</li>
              <li>Cards and information panels</li>
              <li>Navigation elements</li>
            </ul>
            <div class="page-story-note">
              <strong>Note:</strong> This content area adapts based on the selected layout.
            </div>
          </div>
        </ui-page-body>

        <ui-page-footer>
          <div class="page-story-footer">
            <p>© 2024 Page Footer Content</p>
          </div>
        </ui-page-footer>
      </ui-page>
    `,
  }),
};

export default meta;
type TStory = StoryObj<PageComponent>;

export const DefaultLayout: TStory = {
  args: {
    layout: EPageLayout.DEFAULT,
  },
};

export const CenteredLayout: TStory = {
  args: {
    layout: EPageLayout.CENTERED,
  },
};

export const HeaderOnly: TStory = {
  args: {
    layout: EPageLayout.DEFAULT,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-page [layout]="layout">
        <ui-page-header>
          <div class="page-story-header-accent">
            <h1>Header Only Page</h1>
            <p>Sometimes you only need a header</p>
          </div>
        </ui-page-header>
      </ui-page>
    `,
  }),
};

export const BodyOnly: TStory = {
  args: {
    layout: EPageLayout.DEFAULT,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ButtonWrapperComponent],
    },
    template: `
      <ui-page [layout]="layout">
        <ui-page-body>
          <div class="page-story-body-centered">
            <h2>Content Only Page</h2>
            <p>This page only has body content, no header or footer.</p>
            <button-wrapper title="Action Button" variant="flat"></button-wrapper>
          </div>
        </ui-page-body>
      </ui-page>
    `,
  }),
};
