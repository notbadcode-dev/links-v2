import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { DialogWrapperService } from '@libs/wrappers';

import { DeleteButtonComponent } from './delete-button.component';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let openSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    openSpy = vi.fn().mockReturnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<unknown, boolean>);

    await TestBed.configureTestingModule({
      imports: [DeleteButtonComponent],
      providers: [
        {
          provide: DialogWrapperService,
          useValue: {
            open: openSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default button and dialog configs', () => {
    fixture.detectChanges();

    expect(component.effectiveButtonConfig().title).toBe('Delete');
    expect(component.effectiveDialogConfig().title).toBe('Confirm deletion');
  });

  it('should use provided button and dialog configs', () => {
    fixture.componentRef.setInput('buttonConfig', {
      title: 'Eliminar',
      tooltip: 'Eliminar elemento',
    });
    fixture.componentRef.setInput('dialogConfig', {
      title: 'Confirmar eliminacion',
      subtitle: 'Accion irreversible',
      message: '¿Eliminar este elemento?',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
    });
    fixture.detectChanges();

    expect(component.effectiveButtonConfig().title).toBe('Eliminar');
    expect(component.effectiveDialogConfig().title).toBe('Confirmar eliminacion');
  });

  it('should open confirmation dialog when clicked', () => {
    component.onDeleteClick();

    expect(openSpy).toHaveBeenCalled();
  });

  it('should emit confirmed only when dialog returns true', () => {
    openSpy.mockReturnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<unknown, boolean>);
    const emitSpy = vi.spyOn(component.confirmed, 'emit');

    component.onDeleteClick();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit confirmed when dialog returns false', () => {
    openSpy.mockReturnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<unknown, boolean>);
    const emitSpy = vi.spyOn(component.confirmed, 'emit');

    component.onDeleteClick();

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
