import { CommonModule } from '@angular/common';
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
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { BaseDirective } from '@libs/directives';
import { EButtonWrapperColor, EButtonWrapperVariant, ESpacing } from '@libs/enums';

import { DIALOG_WRAPPER_CONSTANTS, DIALOG_WRAPPER_DEFAULTS } from './dialog-wrapper.constants';
import { EDialogWrapperContentType } from './dialog-wrapper.enums';
import { IDialogWrapperData, TDialogWrapperAcceptCallback } from './dialog-wrapper.types';
import { InlineTextComponent } from '../../components/inline-text/inline-text.component';
import { UiPageSectionComponent } from '../../components/page/page.component';
import { StackComponent } from '../../components/stack/stack.component';
import { TitleComponent } from '../../components/title/title.component';
import { ButtonWrapperComponent } from '../button-wrapper/button-wrapper.component';

@Component({
  selector: 'dialog-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonWrapperComponent,
    StackComponent,
    TitleComponent,
    InlineTextComponent,
    UiPageSectionComponent,
  ],
  templateUrl: './dialog-wrapper.component.html',
  styleUrl: './dialog-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': `'${DIALOG_WRAPPER_CONSTANTS.ROOT_CLASS} ' + (customClass() || '')`,
  },
})
export class DialogWrapperComponent<TPayload = unknown, TResult = boolean> extends BaseDirective {
  public readonly title: InputSignal<string> = input<string>('');
  public readonly subtitle: InputSignal<string | undefined> = input<string>();
  public readonly contentType: InputSignal<EDialogWrapperContentType | undefined> =
    input<EDialogWrapperContentType>();
  public readonly message: InputSignal<string | undefined> = input<string>();
  public readonly acceptText: InputSignal<string | undefined> = input<string>();
  public readonly cancelText: InputSignal<string | undefined> = input<string>();
  public readonly acceptColor: InputSignal<EButtonWrapperColor | undefined> =
    input<EButtonWrapperColor>();
  public readonly cancelColor: InputSignal<EButtonWrapperColor | undefined> =
    input<EButtonWrapperColor>();
  public readonly size: InputSignal<ESpacing | undefined> = input<ESpacing>();
  public readonly acceptPayload: InputSignal<TPayload | undefined> = input<TPayload>();
  public readonly onAccept: InputSignal<TDialogWrapperAcceptCallback<TPayload> | undefined> =
    input<TDialogWrapperAcceptCallback<TPayload>>();
  public readonly customClass: InputSignal<string> = input<string>('');
  public readonly contentTemplate: InputSignal<TemplateRef<unknown> | undefined> =
    input<TemplateRef<unknown>>();
  public readonly templateContext: InputSignal<Record<string, unknown> | undefined> =
    input<Record<string, unknown>>();

  public readonly accepted: OutputEmitterRef<TPayload | undefined> = output<TPayload | undefined>();
  public readonly cancelled: OutputEmitterRef<void> = output<void>();

  public readonly effectiveTitle: Signal<string> = computed(() => {
    const inputTitle = this.title().trim();
    if (inputTitle.length > 0) {
      return inputTitle;
    }

    return this._data?.title ?? '';
  });

  public readonly effectiveSubtitle: Signal<string | undefined> = computed(() => {
    const inputSubtitle = this.subtitle()?.trim();
    if ((inputSubtitle?.length ?? 0) > 0) {
      return inputSubtitle;
    }

    const dataSubtitle = this._data?.subtitle?.trim();
    return (dataSubtitle?.length ?? 0) > 0 ? dataSubtitle : undefined;
  });

  public readonly effectiveMessage: Signal<string> = computed(() => {
    const inputMessage = this.message()?.trim();
    if ((inputMessage?.length ?? 0) > 0) {
      return inputMessage ?? '';
    }

    return this._data?.message?.trim() ?? DIALOG_WRAPPER_DEFAULTS.message;
  });

  public readonly effectiveContentType: Signal<EDialogWrapperContentType> = computed(
    () => this.contentType() ?? this._data?.contentType ?? DIALOG_WRAPPER_DEFAULTS.contentType,
  );

  public readonly effectiveAcceptText: Signal<string> = computed(() => {
    const inputAcceptText = this.acceptText()?.trim();
    if ((inputAcceptText?.length ?? 0) > 0) {
      return inputAcceptText ?? DIALOG_WRAPPER_DEFAULTS.acceptText;
    }

    return this._data?.acceptText ?? DIALOG_WRAPPER_DEFAULTS.acceptText;
  });

  public readonly effectiveCancelText: Signal<string> = computed(() => {
    const inputCancelText = this.cancelText()?.trim();
    if ((inputCancelText?.length ?? 0) > 0) {
      return inputCancelText ?? DIALOG_WRAPPER_DEFAULTS.cancelText;
    }

    return this._data?.cancelText ?? DIALOG_WRAPPER_DEFAULTS.cancelText;
  });

  public readonly effectivePayload: Signal<TPayload | undefined> = computed(
    () => this.acceptPayload() ?? this._data?.acceptPayload,
  );

  public readonly effectiveAcceptColor: Signal<EButtonWrapperColor> = computed(
    () => this.acceptColor() ?? this._data?.acceptColor ?? DIALOG_WRAPPER_DEFAULTS.acceptColor,
  );

  public readonly effectiveCancelColor: Signal<EButtonWrapperColor> = computed(
    () => this.cancelColor() ?? this._data?.cancelColor ?? DIALOG_WRAPPER_DEFAULTS.cancelColor,
  );

  public readonly effectiveSize: Signal<ESpacing> = computed(
    () => this.size() ?? this._data?.size ?? DIALOG_WRAPPER_DEFAULTS.size,
  );

  public readonly effectiveContentTemplate: Signal<TemplateRef<unknown> | undefined> = computed(
    () => this.contentTemplate() ?? this._data?.contentTemplate,
  );

  public readonly effectiveTemplateContext: Signal<Record<string, unknown> | undefined> = computed(
    () => this.templateContext() ?? this._data?.templateContext,
  );

  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EButtonWrapperColor: typeof EButtonWrapperColor = EButtonWrapperColor;
  public readonly ESpacing: typeof ESpacing = ESpacing;
  public readonly EDialogWrapperContentType: typeof EDialogWrapperContentType =
    EDialogWrapperContentType;

  private readonly _dialogRef: MatDialogRef<
    DialogWrapperComponent<TPayload, TResult>,
    TResult
  > | null = inject(MatDialogRef<DialogWrapperComponent<TPayload, TResult>, TResult>, {
    optional: true,
  });
  private readonly _data: IDialogWrapperData<TPayload> | null = inject<
    IDialogWrapperData<TPayload>
  >(MAT_DIALOG_DATA, { optional: true });

  private readonly _isProcessingAccept: WritableSignal<boolean> = signal(false);

  public isAcceptDisabled(): boolean {
    return this._isProcessingAccept();
  }

  public async onConfirm(): Promise<void> {
    if (this._isProcessingAccept()) {
      return;
    }

    this._isProcessingAccept.set(true);

    try {
      const callback = this.onAccept() ?? this._data?.onAccept;
      const payload = this.effectivePayload();
      const callbackResult = callback ? await callback(payload) : true;
      const shouldClose = callbackResult !== false;

      if (!shouldClose) {
        return;
      }

      this.accepted.emit(payload);
      this._dialogRef?.close(true as TResult);
    } finally {
      this._isProcessingAccept.set(false);
    }
  }

  public onCancel(): void {
    this.cancelled.emit();
    this._dialogRef?.close(false as TResult);
  }
}
