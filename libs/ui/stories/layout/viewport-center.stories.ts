import { ViewportCenterComponent } from '@libs/components';
import { ButtonWrapperComponent } from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ViewportCenterComponent> = {
  title: 'UI Components/ViewportCenter',
  component: ViewportCenterComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <viewport-center>
        <div class="viewport-center-story-panel">
          <h2 class="viewport-center-story-title">Viewport Centered Content</h2>
          <p class="viewport-center-story-text">
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
    moduleMetadata: {
      imports: [ButtonWrapperComponent],
    },
    template: `
      <viewport-center>
        <div class="viewport-center-story-card">
          <h3 class="viewport-center-story-card-title">Login Form</h3>
          <input type="email" placeholder="Email" class="viewport-center-story-card-input">
          <input type="password" placeholder="Password" class="viewport-center-story-card-input">
          <button-wrapper title="Sign In" [fullWidth]="true"></button-wrapper>
        </div>
      </viewport-center>
    `,
  }),
};

export const WithMultipleElements: TStory = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ButtonWrapperComponent],
    },
    template: `
      <viewport-center>
        <div class="viewport-center-story-group">
          <div class="viewport-center-story-banner">
            <h2 class="viewport-center-story-banner-title">Welcome!</h2>
            <p class="viewport-center-story-banner-text">This is the main content area</p>
          </div>
          <div class="viewport-center-story-note">
            <strong>Note:</strong> This is additional information
          </div>
          <button-wrapper title="Get Started" variant="flat"></button-wrapper>
        </div>
      </viewport-center>
    `,
  }),
};
