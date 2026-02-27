import { EMenuSurfaceLayout, MenuSurfaceComponent, UiMenuOptionDirective } from '@libs/components';
import {
  ButtonWrapperComponent,
  EButtonWrapperContentMode,
  EButtonWrapperVariant,
} from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<MenuSurfaceComponent> = {
  title: 'UI Components/MenuSurface',
  component: MenuSurfaceComponent,
  tags: ['autodocs'],
  args: {
    layout: EMenuSurfaceLayout.LIST,
    columns: 1,
  },
  render: (args) => ({
    props: {
      ...args,
      EMenuSurfaceLayout,
      EButtonWrapperVariant,
      EButtonWrapperContentMode,
    },
    moduleMetadata: {
      imports: [UiMenuOptionDirective, ButtonWrapperComponent],
    },
    template: `
      @if (layout === EMenuSurfaceLayout.LIST) {
        <ui-menu-surface [layout]="layout" [columns]="columns" style="max-width: 260px;">
          <button uiMenuOption [uiMenuOptionActive]="true">English</button>
          <button uiMenuOption>Spanish</button>
        </ui-menu-surface>
      } @else {
        <ui-menu-surface [layout]="layout" [columns]="columns" style="max-width: 320px;">
          <button-wrapper
            uiMenuOption
            [uiMenuOptionActive]="true"
            title="person"
            svgIcon="auth-user-sidebar"
            [contentMode]="EButtonWrapperContentMode.ICON"
            [variant]="EButtonWrapperVariant.BASIC"
          />
          <button-wrapper
            uiMenuOption
            title="theme"
            svgIcon="theme-toggle-animated"
            [contentMode]="EButtonWrapperContentMode.ICON"
            [variant]="EButtonWrapperVariant.BASIC"
          />
          <button-wrapper
            uiMenuOption
            title="bookmark"
            svgIcon="brand-bookmark-animated"
            [contentMode]="EButtonWrapperContentMode.ICON"
            [variant]="EButtonWrapperVariant.BASIC"
          />
        </ui-menu-surface>
      }
    `,
  }),
};

export default meta;
type TStory = StoryObj<MenuSurfaceComponent>;

export const List: TStory = {
  args: {
    layout: EMenuSurfaceLayout.LIST,
    columns: 1,
  },
};

export const Grid: TStory = {
  args: {
    layout: EMenuSurfaceLayout.GRID,
    columns: 3,
  },
};
