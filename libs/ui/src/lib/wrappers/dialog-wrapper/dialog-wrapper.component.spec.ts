import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWrapperComponent } from './dialog-wrapper.component';
import { EDialogWrapperContentType } from './dialog-wrapper.enums';

describe('DialogWrapperComponent', () => {
  let component: DialogWrapperComponent<{ name: string }, boolean>;
  let fixture: ComponentFixture<DialogWrapperComponent<{ name: string }, boolean>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogWrapperComponent<{ name: string }, boolean>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('title', 'Confirm action');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should resolve content type', () => {
    fixture.componentRef.setInput('title', 'Confirm action');
    fixture.componentRef.setInput('contentType', EDialogWrapperContentType.FORM);
    fixture.detectChanges();

    expect(component.effectiveContentType()).toBe(EDialogWrapperContentType.FORM);
  });

  it('should emit accepted when callback allows close', async () => {
    fixture.componentRef.setInput('title', 'Confirm action');
    fixture.componentRef.setInput('acceptPayload', { name: 'Bruno' });
    fixture.componentRef.setInput('onAccept', () => true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.accepted, 'emit');
    await component.onConfirm();

    expect(emitSpy).toHaveBeenCalledWith({ name: 'Bruno' });
  });

  it('should not emit accepted when callback returns false', async () => {
    fixture.componentRef.setInput('title', 'Confirm action');
    fixture.componentRef.setInput('onAccept', () => false);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.accepted, 'emit');
    await component.onConfirm();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit cancelled when cancel is clicked', () => {
    fixture.componentRef.setInput('title', 'Confirm action');
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.cancelled, 'emit');
    component.onCancel();

    expect(emitSpy).toHaveBeenCalled();
  });
});
