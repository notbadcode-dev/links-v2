import type { Meta, StoryObj } from '@storybook/angular';

import { InputTextWrapperComponent } from '@libs/ui';

const meta: Meta<InputTextWrapperComponent> = {
  title: 'UI Components/InputTextWrapper',
  component: InputTextWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  args: {
    // valueChanged: fn(),
  },
};

export default meta;
type TStory = StoryObj<InputTextWrapperComponent>;

export const Basic: TStory = {
  args: {
    label: 'Nombre',
    placeholder: 'Ingrese su nombre',
  },
};

export const WithIcon: TStory = {
  args: {
    label: 'Email',
    placeholder: 'ejemplo@email.com',
    type: 'email',
    icon: 'email',
  },
};

export const WithHint: TStory = {
  args: {
    label: 'Contraseña',
    type: 'password',
    icon: 'lock',
    hint: 'Mínimo 8 caracteres',
    required: true,
  },
};

export const WithError: TStory = {
  args: {
    label: 'Email',
    type: 'email',
    icon: 'email',
    errorMessage: 'Email inválido',
    required: true,
  },
};

export const Disabled: TStory = {
  args: {
    label: 'Usuario',
    value: 'admin@example.com',
    disabled: true,
    icon: 'person',
  },
};

export const Search: TStory = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar productos...',
    icon: 'search',
  },
};

export const Phone: TStory = {
  args: {
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    icon: 'phone',
    hint: 'Formato: +1 (555) 000-0000',
  },
};

export const URL: TStory = {
  args: {
    label: 'Sitio Web',
    type: 'url',
    placeholder: 'https://ejemplo.com',
    icon: 'link',
    hint: 'Incluya http:// o https://',
  },
};
