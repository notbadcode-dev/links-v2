import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormContainerComponent } from '@libs/components';
import { ButtonWrapperComponent } from '@libs/wrappers';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FormContainerComponent> = {
  title: 'UI Components/FormContainer',
  component: FormContainerComponent,
  tags: ['autodocs'],
  argTypes: {
    formSubmit: {
      action: 'formSubmit',
      description: 'Event emitted when form is submitted',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      sampleForm: new FormGroup({
        email: new FormControl(''),
        name: new FormControl(''),
      }),
      onFormSubmit: args.formSubmit,
    },
    template: `
      <ui-form-container
        [formGroup]="sampleForm"
        (formSubmit)="onFormSubmit()">
        <div>
          <label for="form-container-email">Email</label>
          <input id="form-container-email" type="email" formControlName="email">
        </div>
        <div>
          <label for="form-container-name">Name</label>
          <input id="form-container-name" type="text" formControlName="name">
        </div>
        <button-wrapper title="Submit"></button-wrapper>
      </ui-form-container>
    `,
    moduleMetadata: {
      imports: [ReactiveFormsModule, ButtonWrapperComponent],
    },
  }),
};

export default meta;
type TStory = StoryObj<FormContainerComponent>;

export const Basic: TStory = {};

export const WithValidation: TStory = {
  render: (args) => ({
    props: {
      ...args,
      validationForm: (() => {
        const form = new FormGroup({
          email: new FormControl('', { validators: [] }),
          name: new FormControl('', { validators: [] }),
        });

        form.markAllAsTouched();
        return form;
      })(),
      onFormSubmit: args.formSubmit,
    },
    template: `
      <ui-form-container
        [formGroup]="validationForm"
        (formSubmit)="onFormSubmit()">
        <div>
          <label for="form-container-validation-email">Email (required)</label>
          <input
            id="form-container-validation-email"
            type="email"
            formControlName="email"
          >
          <div
            *ngIf="validationForm.get('email')?.invalid && validationForm.get('email')?.touched"
          >
            Email is required
          </div>
        </div>
        <div>
          <label for="form-container-validation-name">Name (required)</label>
          <input
            id="form-container-validation-name"
            type="text"
            formControlName="name"
          >
          <div
            *ngIf="validationForm.get('name')?.invalid && validationForm.get('name')?.touched"
          >
            Name is required
          </div>
        </div>
        <button-wrapper title="Submit"></button-wrapper>
      </ui-form-container>
    `,
    moduleMetadata: {
      imports: [ReactiveFormsModule, ButtonWrapperComponent],
    },
  }),
};
