import { expect, fn, userEvent, within } from 'storybook/test';

import { PaginationComponent } from '@libs/components';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<PaginationComponent> = {
  title: 'UI Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Total number of pages',
    },
    currentPage: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Current active page',
    },
    config: {
      control: 'object',
      description: 'Pagination visual and behavior config',
    },
  },
  args: {
    totalPages: 12,
    currentPage: 1,
    pageChange: fn(),
  },
};

export default meta;
type TStory = StoryObj<PaginationComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    totalPages: 12,
    currentPage: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: '1' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: '2' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '3' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /go to first page/i })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /go to previous page/i })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /go to next page/i })).toBeEnabled();
    await expect(canvas.getByRole('button', { name: /go to last page/i })).toBeEnabled();
  },
};

export const MiddlePage: TStory = {
  tags: ['interaction'],
  args: {
    totalPages: 12,
    currentPage: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: '5' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '6' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: '7' })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /go to next page/i }));
  },
};

export const LastPage: TStory = {
  tags: ['interaction'],
  args: {
    totalPages: 12,
    currentPage: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: '10' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '11' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '12' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /go to next page/i })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /go to last page/i })).toBeDisabled();
  },
};

export const ScrollMode: TStory = {
  args: {
    totalPages: 12,
    currentPage: 6,
    config: {
      scrollMode: true,
      hideNavigationButtonsInScroll: true,
      ariaLabel: 'Links pagination',
    },
  },
};
