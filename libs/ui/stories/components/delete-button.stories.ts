import { fn } from 'storybook/test';

import { DeleteButtonComponent } from '@libs/components';
import { ESpacing } from '@libs/enums';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DeleteButtonComponent> = {
  title: 'UI Components/DeleteButton',
  component: DeleteButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables delete action',
    },
    buttonConfig: {
      control: 'object',
      description: 'Button wrapper config',
    },
    dialogConfig: {
      control: 'object',
      description: 'Dialog wrapper config',
    },
  },
  args: {
    confirmed: fn(),
  },
};

export default meta;
type TStory = StoryObj<DeleteButtonComponent>;

export const SpanishDefault: TStory = {
  args: {
    buttonConfig: {
      title: 'Eliminar',
      tooltip: 'Eliminar',
      icon: '',
      svgIcon: 'delete-animated',
    },
    dialogConfig: {
      title: 'Confirmar eliminación',
      subtitle: 'Esta acción no se puede deshacer',
      message: '¿Quieres eliminar este elemento?',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
    },
  },
};

export const EnglishDefault: TStory = {
  args: {
    buttonConfig: {
      title: 'Delete',
      tooltip: 'Delete',
      icon: '',
      svgIcon: 'delete-animated',
    },
    dialogConfig: {
      title: 'Confirm deletion',
      subtitle: 'This action cannot be undone',
      message: 'Do you want to delete this item?',
      acceptText: 'Delete',
      cancelText: 'Cancel',
    },
  },
};

export const CustomTexts: TStory = {
  args: {
    buttonConfig: {
      title: 'Remove',
      tooltip: 'Remove user',
      icon: '',
      svgIcon: 'delete-animated',
    },
    dialogConfig: {
      title: 'Delete user',
      subtitle: 'Please confirm this destructive action',
      message: 'Do you really want to remove this user account?',
      acceptText: 'Delete user',
      cancelText: 'Keep user',
      size: ESpacing.MD,
    },
  },
};

export const Disabled: TStory = {
  args: {
    disabled: true,
    buttonConfig: {
      title: 'Eliminar',
      tooltip: 'Eliminar',
      icon: '',
      svgIcon: 'delete-animated',
    },
    dialogConfig: {
      title: 'Confirmar eliminación',
      subtitle: 'Esta acción no se puede deshacer',
      message: '¿Quieres eliminar este elemento?',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
    },
  },
};
