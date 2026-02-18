import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonWrapperComponent, FormContainerComponent } from '@libs/ui';

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
          <label>Email:</label>
          <input type="email" formControlName="email" style="width: 100%; padding: 8px; margin: 4px 0;">
        </div>
        <div style="margin-top: 16px;">
          <label>Name:</label>
          <input type="text" formControlName="name" style="width: 100%; padding: 8px; margin: 4px 0;">
        </div>
        <button-wrapper title="Submit" style="margin-top: 16px;"></button-wrapper>
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
          <label>Email (required):</label>
          <input type="email" formControlName="email" style="width: 100%; padding: 8px; margin: 4px 0; border: 1px solid #ddd;">
          <div *ngIf="validationForm.get('email')?.invalid && validationForm.get('email')?.touched"
               style="color: red; font-size: 12px;">
            Email is required
          </div>
        </div>
        <div style="margin-top: 16px;">
          <label>Name (required):</label>
          <input type="text" formControlName="name" style="width: 100%; padding: 8px; margin: 4px 0; border: 1px solid #ddd;">
          <div *ngIf="validationForm.get('name')?.invalid && validationForm.get('name')?.touched"
               style="color: red; font-size: 12px;">
            Name is required
          </div>
        </div>
        <button-wrapper title="Submit" style="margin-top: 16px;"></button-wrapper>
      </ui-form-container>
    `,
    moduleMetadata: {
      imports: [ReactiveFormsModule, ButtonWrapperComponent],
    },
  }),
};
