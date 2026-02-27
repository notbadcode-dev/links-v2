import { TemplateRef } from '@angular/core';

import { EButtonWrapperColor, ESpacing } from '@libs/enums';

import { EDialogWrapperContentType } from './dialog-wrapper.enums';

export type TDialogWrapperAcceptResult = boolean | void | Promise<boolean | void>;

export type TDialogWrapperAcceptCallback<TPayload = unknown> = (
  payload: TPayload | undefined,
) => TDialogWrapperAcceptResult;

export interface IDialogWrapperConfig<TPayload = unknown> {
  title: string;
  subtitle?: string;
  contentType?: EDialogWrapperContentType;
  message?: string;
  acceptText?: string;
  cancelText?: string;
  acceptColor?: EButtonWrapperColor;
  cancelColor?: EButtonWrapperColor;
  size?: ESpacing;
  acceptPayload?: TPayload;
  onAccept?: TDialogWrapperAcceptCallback<TPayload>;
  customClass?: string;
}

export interface IDialogWrapperOpenConfig<
  TPayload = unknown,
> extends IDialogWrapperConfig<TPayload> {
  contentTemplate?: TemplateRef<unknown>;
  templateContext?: Record<string, unknown>;
}

export interface IDialogWrapperData<
  TPayload = unknown,
> extends IDialogWrapperOpenConfig<TPayload> {}
