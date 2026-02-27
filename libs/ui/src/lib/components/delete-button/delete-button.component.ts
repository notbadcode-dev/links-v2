import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BaseDirective } from '@libs/directives';
import { ButtonWrapperComponent, DialogWrapperService } from '@libs/wrappers';

import {
  DELETE_BUTTON_DEFAULT_BUTTON_CONFIG,
  DELETE_BUTTON_DEFAULT_DIALOG_CONFIG,
} from './delete-button.constants';
import { IDeleteButtonButtonConfig, IDeleteButtonDialogConfig } from './delete-button.types';

@Component({
  selector: 'ui-delete-button',
  standalone: true,
  imports: [ButtonWrapperComponent],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent extends BaseDirective {
  public readonly buttonConfig: InputSignal<IDeleteButtonButtonConfig | undefined> =
    input<IDeleteButtonButtonConfig>();
  public readonly dialogConfig: InputSignal<IDeleteButtonDialogConfig | undefined> =
    input<IDeleteButtonDialogConfig>();
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  public readonly confirmed: OutputEmitterRef<void> = output<void>();

  public readonly effectiveButtonConfig: Signal<Required<IDeleteButtonButtonConfig>> = computed(
    () => ({
      ...DELETE_BUTTON_DEFAULT_BUTTON_CONFIG,
      ...(this.buttonConfig() ?? {}),
    }),
  );
  public readonly effectiveDialogConfig: Signal<Required<IDeleteButtonDialogConfig>> = computed(
    () => ({
      ...DELETE_BUTTON_DEFAULT_DIALOG_CONFIG,
      ...(this.dialogConfig() ?? {}),
    }),
  );

  private readonly _dialogWrapperService: DialogWrapperService = inject(DialogWrapperService);

  public onDeleteClick(): void {
    if (this.disabled()) {
      return;
    }

    const dialogConfig = this.effectiveDialogConfig();
    const dialogRef = this._dialogWrapperService.open({
      title: dialogConfig.title,
      subtitle: dialogConfig.subtitle,
      message: dialogConfig.message,
      contentType: dialogConfig.contentType,
      acceptText: dialogConfig.acceptText,
      cancelText: dialogConfig.cancelText,
      acceptColor: dialogConfig.acceptColor,
      cancelColor: dialogConfig.cancelColor,
      size: dialogConfig.size,
      customClass: dialogConfig.customClass,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((accepted) => {
        if (!accepted) {
          return;
        }

        this.confirmed.emit();
      });
  }
}
