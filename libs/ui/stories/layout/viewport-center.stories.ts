import type { Meta, StoryObj } from '@storybook/angular';

import { ViewportCenterComponent } from '@libs/ui';

const meta: Meta<ViewportCenterComponent> = {
  title: 'UI Components/ViewportCenter',
  component: ViewportCenterComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <viewport-center>
        <div style="background: #f8f9fa; padding: 32px; border: 2px dashed #dee2e6; text-align: center; border-radius: 8px;">
          <h2 style="margin: 0 0 16px 0; color: #495057;">Viewport Centered Content</h2>
          <p style="margin: 0; color: #6c757d;">
            This content is automatically centered within the viewport.
            It can contain any HTML elements.
          </p>
        </div>
      </viewport-center>
    `,
  }),
};

export default meta;
type TStory = StoryObj<ViewportCenterComponent>;

export const Basic: TStory = {};

export const WithCard: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <viewport-center>
        <div style="background: white; padding: 32px; border-radius: 8px; border: 1px solid #e1e4e8; max-width: 400px;">
          <h3 style="margin: 0 0 16px 0;">Login Form</h3>
          <input type="email" placeholder="Email" style="width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #ddd; border-radius: 4px;">
          <input type="password" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #ddd; border-radius: 4px;">
          <button style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px;">
            Sign In
          </button>
        </div>
      </viewport-center>
    `,
  }),
};

export const WithMultipleElements: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <viewport-center>
        <div style="text-align: center;">
          <div style="background: #e7f3ff; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 8px 0; color: #0056b3;">Welcome!</h2>
            <p style="margin: 0; color: #495057;">This is the main content area</p>
          </div>
          <div style="background: #fff3cd; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <strong>Note:</strong> This is additional information
          </div>
          <button style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 4px;">
            Get Started
          </button>
        </div>
      </viewport-center>
    `,
  }),
};
