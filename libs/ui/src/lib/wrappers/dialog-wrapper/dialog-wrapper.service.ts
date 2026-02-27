import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ESpacing } from '@libs/enums';

import { DialogWrapperComponent } from './dialog-wrapper.component';
import {
  DIALOG_WRAPPER_CONSTANTS,
  DIALOG_WRAPPER_DEFAULTS,
  DIALOG_WRAPPER_SIZE_MAP,
} from './dialog-wrapper.constants';
import { IDialogWrapperOpenConfig } from './dialog-wrapper.types';

@Injectable({
  providedIn: 'root',
})
export class DialogWrapperService {
  private readonly _dialog: MatDialog = inject(MatDialog);

  public open<TPayload = unknown>(
    config: IDialogWrapperOpenConfig<TPayload>,
  ): MatDialogRef<DialogWrapperComponent<TPayload, boolean>, boolean> {
    const resolvedSize = this._resolveSize(config.size ?? DIALOG_WRAPPER_DEFAULTS.size);
    const dialogRef = this._dialog.open<
      DialogWrapperComponent<TPayload, boolean>,
      IDialogWrapperOpenConfig<TPayload>,
      boolean
    >(DialogWrapperComponent<TPayload, boolean>, {
      disableClose: true,
      autoFocus: false,
      panelClass: DIALOG_WRAPPER_CONSTANTS.PANEL_CLASS,
      backdropClass: DIALOG_WRAPPER_CONSTANTS.BACKDROP_CLASS,
      enterAnimationDuration: '220ms',
      exitAnimationDuration: '180ms',
      width: resolvedSize,
      maxWidth: resolvedSize,
      data: {
        ...DIALOG_WRAPPER_DEFAULTS,
        ...config,
      },
    });

    return dialogRef;
  }

  private _resolveSize(size: ESpacing): string {
    return DIALOG_WRAPPER_SIZE_MAP[size];
  }
}
