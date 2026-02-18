import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { ITreeNode, TreeWrapperComponent } from '@libs/ui';

const sampleData: ITreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    icon: 'folder',
    children: [
      {
        id: '1.1',
        label: 'Resume.pdf',
        icon: 'description',
      },
      {
        id: '1.2',
        label: 'Cover Letter.docx',
        icon: 'description',
      },
    ],
  },
  {
    id: '2',
    label: 'Pictures',
    icon: 'folder',
    children: [
      {
        id: '2.1',
        label: 'Vacation',
        icon: 'folder',
        children: [
          {
            id: '2.1.1',
            label: 'beach.jpg',
            icon: 'image',
          },
          {
            id: '2.1.2',
            label: 'sunset.jpg',
            icon: 'image',
          },
        ],
      },
      {
        id: '2.2',
        label: 'profile.png',
        icon: 'image',
      },
    ],
  },
  {
    id: '3',
    label: 'Music',
    icon: 'folder',
    children: [
      {
        id: '3.1',
        label: 'song1.mp3',
        icon: 'music_note',
      },
      {
        id: '3.2',
        label: 'song2.mp3',
        icon: 'music_note',
      },
    ],
  },
];

const meta: Meta<TreeWrapperComponent> = {
  title: 'UI Wrappers/TreeWrapper',
  component: TreeWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    dataSource: {
      control: 'object',
      description: 'Tree data source',
    },
    config: {
      control: 'object',
      description: 'Tree configuration options',
    },
  },
  args: {
    dataSource: sampleData,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    nodeSelected: fn() as (() => void) | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    nodeToggle: fn() as (() => void) | undefined,
  },
};

export default meta;
type TStory = StoryObj<TreeWrapperComponent>;

export const Basic: TStory = {
  args: {
    dataSource: sampleData,
  },
};

export const SimpleTree: TStory = {
  args: {
    dataSource: [
      {
        id: '1',
        label: 'Root Item 1',
        children: [
          { id: '1.1', label: 'Child 1' },
          { id: '1.2', label: 'Child 2' },
        ],
      },
      {
        id: '2',
        label: 'Root Item 2',
        children: [
          { id: '2.1', label: 'Child A' },
          { id: '2.2', label: 'Child B' },
        ],
      },
    ],
  },
};

export const WithCustomConfig: TStory = {
  args: {
    dataSource: sampleData,
    config: {
      expandedIcon: 'expand_more',
      collapsedIcon: 'chevron_right',
      showLines: true,
    },
  },
};

export const NavigationMenu: TStory = {
  args: {
    dataSource: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'people',
        children: [
          { id: 'users.list', label: 'All Users', icon: 'list' },
          { id: 'users.create', label: 'Create User', icon: 'person_add' },
          { id: 'users.roles', label: 'Roles & Permissions', icon: 'security' },
        ],
      },
      {
        id: 'content',
        label: 'Content Management',
        icon: 'article',
        children: [
          {
            id: 'content.posts',
            label: 'Posts',
            icon: 'description',
            children: [
              { id: 'content.posts.published', label: 'Published', icon: 'publish' },
              { id: 'content.posts.drafts', label: 'Drafts', icon: 'edit' },
              { id: 'content.posts.archived', label: 'Archived', icon: 'archive' },
            ],
          },
          { id: 'content.media', label: 'Media Library', icon: 'photo_library' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        children: [
          { id: 'settings.general', label: 'General', icon: 'tune' },
          { id: 'settings.security', label: 'Security', icon: 'security' },
          { id: 'settings.notifications', label: 'Notifications', icon: 'notifications' },
        ],
      },
    ],
  },
};

export const FileSystemTree: TStory = {
  args: {
    dataSource: [
      {
        id: 'src',
        label: 'src',
        icon: 'folder',
        children: [
          {
            id: 'src/app',
            label: 'app',
            icon: 'folder',
            children: [
              {
                id: 'src/app/components',
                label: 'components',
                icon: 'folder',
                children: [
                  {
                    id: 'src/app/components/header.ts',
                    label: 'header.component.ts',
                    icon: 'code',
                  },
                  {
                    id: 'src/app/components/footer.ts',
                    label: 'footer.component.ts',
                    icon: 'code',
                  },
                ],
              },
              { id: 'src/app/app.component.ts', label: 'app.component.ts', icon: 'code' },
              { id: 'src/app/app.module.ts', label: 'app.module.ts', icon: 'code' },
            ],
          },
          {
            id: 'src/assets',
            label: 'assets',
            icon: 'folder',
            children: [
              { id: 'src/assets/logo.png', label: 'logo.png', icon: 'image' },
              { id: 'src/assets/styles.css', label: 'styles.css', icon: 'style' },
            ],
          },
        ],
      },
      { id: 'package.json', label: 'package.json', icon: 'description' },
      { id: 'README.md', label: 'README.md', icon: 'description' },
    ],
  },
};
