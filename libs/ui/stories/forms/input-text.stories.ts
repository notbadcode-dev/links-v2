import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { EInputTextWrapperType, InputTextWrapperComponent } from '@libs/ui';

const meta: Meta<InputTextWrapperComponent> = {
  title: 'UI Components/InputTextWrapper',
  component: InputTextWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(EInputTextWrapperType),
    },
    required: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on external label',
    },
  },
  args: {},
};

export default meta;
type TStory = StoryObj<InputTextWrapperComponent>;

export const Basic: TStory = {
  tags: ['interaction'],
  args: {
    label: 'Nombre',
    placeholder: 'Ingrese su nombre',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/ingrese su nombre/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'Bruno');
    await expect(input).toHaveValue('Bruno');
  },
};

export const WithIcon: TStory = {
  args: {
    label: 'Email',
    placeholder: 'ejemplo@email.com',
    type: EInputTextWrapperType.EMAIL,
    icon: 'email',
  },
};

export const WithHint: TStory = {
  args: {
    label: 'Contraseña',
    type: EInputTextWrapperType.PASSWORD,
    icon: 'lock',
    hint: 'Mínimo 8 caracteres',
    required: true,
    tooltip: 'Usa al menos 8 caracteres',
  },
};

export const WithError: TStory = {
  args: {
    label: 'Email',
    type: EInputTextWrapperType.EMAIL,
    icon: 'email',
    errorMessage: 'Email inválido',
    required: true,
  },
};

export const Disabled: TStory = {
  tags: ['interaction'],
  render: (args) => ({
    props: {
      ...args,
      disabledControl: new FormControl({ value: 'admin@example.com', disabled: true }),
    },
    template: `
      <input-text-wrapper
        [formControl]="disabledControl"
        [label]="label"
        [icon]="icon">
      </input-text-wrapper>
    `,
  }),
  args: {
    label: 'Usuario',
    icon: 'person',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByDisplayValue('admin@example.com');

    await expect(input).toBeDisabled();
  },
};

export const Search: TStory = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar productos...',
    icon: 'search',
  },
};

export const URL: TStory = {
  args: {
    label: 'Sitio Web',
    type: EInputTextWrapperType.URL,
    placeholder: 'https://ejemplo.com',
    icon: 'link',
    hint: 'Incluya http:// o https://',
    tooltip: 'Ejemplo: https://mi-sitio.com',
  },
};
