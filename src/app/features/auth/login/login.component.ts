import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import {
  ButtonComponent,
  InputTextWrapperComponent,
} from '../../../shared/ui';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    InputTextWrapperComponent,
    ButtonComponent,
  ],
})
export class LoginComponent {
  readonly isLoading = signal(false);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailErrorMessage(): string {
    const control = this.loginForm.controls.email;
    if (control.hasError('required')) return 'El email es requerido';
    if (control.hasError('email')) return 'Ingresa un email válido';
    return '';
  }

  get passwordErrorMessage(): string {
    const control = this.loginForm.controls.password;
    if (control.hasError('required')) return 'La contraseña es requerida';
    if (control.hasError('minlength')) return 'Mínimo 6 caracteres';
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password } = this.loginForm.getRawValue();
    console.log('Login submitted:', { email, password });

    // TODO: Inyectar servicio de auth y llamar al backend
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
}
