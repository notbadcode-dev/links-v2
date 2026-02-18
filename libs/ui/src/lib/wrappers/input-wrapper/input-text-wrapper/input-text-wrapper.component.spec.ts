import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextWrapperComponent } from './input-text-wrapper.component';

describe('InputTextWrapperComponent', () => {
  let component: InputTextWrapperComponent;
  let fixture: ComponentFixture<InputTextWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextWrapperComponent, NoopAnimationsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextWrapperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.form-label');
    expect(label?.textContent).toContain('Test Label');
  });

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should update value via writeValue', () => {
    component.writeValue('test value');
    expect(component.value()).toBe('test value');
  });

  it('should call onChange when value changes', () => {
    let changedValue = '';
    component.registerOnChange((value: string | null) => {
      changedValue = value ?? '';
    });

    component.onChange('new value');
    expect(changedValue).toBe('new value');
  });

  it('should call onTouched when blurred', () => {
    let touched = false;
    component.registerOnTouched(() => {
      touched = true;
    });

    component.onBlur();
    expect(touched).toBe(true);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);

    component.setDisabledState(false);
    expect(component.isDisabled()).toBe(false);
  });

  it('should display icon when provided', () => {
    fixture.componentRef.setInput('icon', 'search');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('mat-icon');
    expect(icon?.textContent).toContain('search');
  });

  it('should display hint when provided', () => {
    fixture.componentRef.setInput('hint', 'This is a hint');
    fixture.detectChanges();

    const hint = fixture.nativeElement.querySelector('.form-caption');
    expect(hint?.textContent).toContain('This is a hint');
  });

  it('should work with FormControl', () => {
    const control = new FormControl('initial value');
    component.writeValue(control.value);

    let formValue = '';
    component.registerOnChange((value: string | null) => {
      formValue = value ?? '';
    });

    component.onChange('updated value');
    expect(formValue).toBe('updated value');
  });
});
