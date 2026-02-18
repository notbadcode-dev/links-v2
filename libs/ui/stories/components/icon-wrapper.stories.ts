import type { Meta, StoryObj } from '@storybook/angular';

import { IconWrapperComponent } from '@libs/ui';

const meta: Meta<IconWrapperComponent> = {
  title: 'UI Wrappers/IconWrapper',
  component: IconWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Material icon name',
    },
  },
  args: {
    icon: 'home',
  },
};

export default meta;
type TStory = StoryObj<IconWrapperComponent>;

export const Basic: TStory = {
  args: {
    icon: 'home',
  },
};

export const NavigationIcons: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <icon-wrapper icon="home"></icon-wrapper>
        <icon-wrapper icon="dashboard"></icon-wrapper>
        <icon-wrapper icon="settings"></icon-wrapper>
        <icon-wrapper icon="account_circle"></icon-wrapper>
        <icon-wrapper icon="notifications"></icon-wrapper>
        <icon-wrapper icon="help"></icon-wrapper>
      </div>
    `,
  }),
};

export const ActionIcons: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <icon-wrapper icon="edit"></icon-wrapper>
        <icon-wrapper icon="delete"></icon-wrapper>
        <icon-wrapper icon="add"></icon-wrapper>
        <icon-wrapper icon="save"></icon-wrapper>
        <icon-wrapper icon="download"></icon-wrapper>
        <icon-wrapper icon="upload"></icon-wrapper>
      </div>
    `,
  }),
};

export const StatusIcons: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <icon-wrapper icon="check_circle"></icon-wrapper>
        <icon-wrapper icon="error"></icon-wrapper>
        <icon-wrapper icon="warning"></icon-wrapper>
        <icon-wrapper icon="info"></icon-wrapper>
        <icon-wrapper icon="visibility"></icon-wrapper>
        <icon-wrapper icon="visibility_off"></icon-wrapper>
      </div>
    `,
  }),
};

export const WithText: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <icon-wrapper icon="email"></icon-wrapper>
          <span>Send Email</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <icon-wrapper icon="phone"></icon-wrapper>
          <span>Call Support</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <icon-wrapper icon="location_on"></icon-wrapper>
          <span>View Location</span>
        </div>
      </div>
    `,
  }),
};

export const Large: TStory = {
  render: (args) => ({
    props: args,
    template: `
      <div style="font-size: 48px;">
        <icon-wrapper icon="star"></icon-wrapper>
      </div>
    `,
  }),
};
