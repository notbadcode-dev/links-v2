import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonWrapperComponent, EPageLayout, PageComponent } from '@libs/ui';

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
          <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
            <h1 style="margin: 0;">Page Header</h1>
            <p style="margin: 8px 0 0 0; color: #6c757d;">This is the page header section</p>
          </div>
        </ui-page-header>

        <ui-page-body>
          <div style="padding: 24px;">
            <h2>Main Content</h2>
            <p>This is the main content area of the page. It can contain any type of content including:</p>
            <ul>
              <li>Forms and input fields</li>
              <li>Data tables and lists</li>
              <li>Cards and information panels</li>
              <li>Navigation elements</li>
            </ul>
            <div style="background: #e9ecef; padding: 16px; border-radius: 4px; margin: 16px 0;">
              <strong>Note:</strong> This content area adapts based on the selected layout.
            </div>
          </div>
        </ui-page-body>

        <ui-page-footer>
          <div style="padding: 16px; background: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
            <p style="margin: 0; color: #6c757d;">© 2024 Page Footer Content</p>
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
          <div style="padding: 24px; background: #007bff; color: white;">
            <h1 style="margin: 0;">Header Only Page</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Sometimes you only need a header</p>
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
          <div style="padding: 32px; text-align: center;">
            <h2>Content Only Page</h2>
            <p>This page only has body content, no header or footer.</p>
            <button-wrapper title="Action Button" variant="flat"></button-wrapper>
          </div>
        </ui-page-body>
      </ui-page>
    `,
  }),
};
