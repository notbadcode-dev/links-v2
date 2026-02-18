import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

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
  },
  args: {},
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
  },
};
