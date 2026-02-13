import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { InputTextComponent } from '../app/shared/ui/input-text';

const meta: Meta<InputTextComponent> = {
  title: 'UI Components/InputText',
  component: InputTextComponent,
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
    valueChanged: fn(),
  },
};

export default meta;
type Story = StoryObj<InputTextComponent>;

export const Basic: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Ingrese su nombre',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'ejemplo@email.com',
    type: 'email',
    icon: 'email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    icon: 'lock',
    hint: 'Mínimo 8 caracteres',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    icon: 'email',
    errorMessage: 'Email inválido',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Usuario',
    value: 'admin@example.com',
    disabled: true,
    icon: 'person',
  },
};

export const Search: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar productos...',
    icon: 'search',
  },
};

export const Phone: Story = {
  args: {
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    icon: 'phone',
    hint: 'Formato: +1 (555) 000-0000',
  },
};

export const URL: Story = {
  args: {
    label: 'Sitio Web',
    type: 'url',
    placeholder: 'https://ejemplo.com',
    icon: 'link',
    hint: 'Incluya http:// o https://',
  },
};
