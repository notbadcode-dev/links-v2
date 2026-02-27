import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ESpacing } from '@libs/enums';

import { DialogWrapperComponent } from './dialog-wrapper.component';
import { DialogWrapperService } from './dialog-wrapper.service';

describe('DialogWrapperService', () => {
  let service: DialogWrapperService;
  let dialogOpenSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dialogOpenSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        DialogWrapperService,
        {
          provide: MatDialog,
          useValue: {
            open: dialogOpenSpy,
          },
        },
      ],
    });

    service = TestBed.inject(DialogWrapperService);
  });

  it('should open dialog with disableClose and resolved size', () => {
    const fakeDialogRef = {} as MatDialogRef<DialogWrapperComponent<unknown, boolean>, boolean>;
    dialogOpenSpy.mockReturnValue(fakeDialogRef);

    const dialogRef = service.open({
      title: 'Delete link',
      size: ESpacing.LG,
      acceptText: 'Delete',
      cancelText: 'Cancel',
    });

    expect(dialogRef).toBe(fakeDialogRef);
    expect(dialogOpenSpy).toHaveBeenCalledWith(DialogWrapperComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'dialog-wrapper-panel',
      width: '44rem',
      maxWidth: '44rem',
      data: expect.objectContaining({
        title: 'Delete link',
        size: ESpacing.LG,
        acceptText: 'Delete',
        cancelText: 'Cancel',
      }),
    });
  });
});
