import { fn } from 'storybook/test';

import { EDialogWrapperContentType, DialogWrapperComponent } from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DialogWrapperComponent> = {
  title: 'UI Wrappers/DialogWrapper',
  component: DialogWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    subtitle: {
      control: 'text',
      description: 'Dialog subtitle',
    },
    contentType: {
      control: 'select',
      options: Object.values(EDialogWrapperContentType),
      description: 'Dialog content mode',
    },
    message: {
      control: 'text',
      description: 'Message text used in MESSAGE content mode',
    },
    acceptText: {
      control: 'text',
      description: 'Accept action label',
    },
    cancelText: {
      control: 'text',
      description: 'Cancel action label',
    },
    size: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Dialog size token based on ESpacing',
    },
  },
  args: {
    title: 'Confirm action',
    subtitle: 'Review the information before continuing',
    contentType: EDialogWrapperContentType.MESSAGE,
    message: 'This action cannot be undone.',
    acceptText: 'Accept',
    cancelText: 'Cancel',
    accepted: fn(),
    cancelled: fn(),
  },
};

export default meta;
type TStory = StoryObj<DialogWrapperComponent>;

export const MessageDialog: TStory = {};

export const FormContentDialog: TStory = {
  args: {
    title: 'Create link',
    subtitle: 'Fill out required fields',
    contentType: EDialogWrapperContentType.FORM,
    message: undefined,
    acceptText: 'Save',
    cancelText: 'Discard',
  },
  render: (args) => ({
    props: args,
    template: `
      <dialog-wrapper
        [title]="title"
        [subtitle]="subtitle"
        [contentType]="contentType"
        [acceptText]="acceptText"
        [cancelText]="cancelText"
        (accepted)="accepted($event)"
        (cancelled)="cancelled()"
      >
        <div style="display:flex;flex-direction:column;gap:8px">
          <label for="dialog-link-title">Link title</label>
          <input id="dialog-link-title" type="text" placeholder="My link" />
          <label for="dialog-link-url">Link URL</label>
          <input id="dialog-link-url" type="url" placeholder="https://example.com" />
        </div>
      </dialog-wrapper>
    `,
  }),
};
