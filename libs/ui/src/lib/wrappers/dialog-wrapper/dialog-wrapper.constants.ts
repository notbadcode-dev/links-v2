import { EButtonWrapperColor, ESpacing } from '@libs/enums';

import { EDialogWrapperContentType } from './dialog-wrapper.enums';
import { IDialogWrapperConfig } from './dialog-wrapper.types';

export const DIALOG_WRAPPER_DEFAULTS: Required<
  Omit<IDialogWrapperConfig<unknown>, 'title' | 'onAccept' | 'acceptPayload'>
> = {
  subtitle: '',
  contentType: EDialogWrapperContentType.MESSAGE,
  message: '',
  acceptText: 'Aceptar',
  cancelText: 'Cancelar',
  acceptColor: EButtonWrapperColor.PRIMARY,
  cancelColor: EButtonWrapperColor.PRIMARY,
  size: ESpacing.MD,
  customClass: '',
};

export const DIALOG_WRAPPER_SIZE_MAP: Record<ESpacing, string> = {
  [ESpacing.NONE]: '20rem',
  [ESpacing.SM]: '24rem',
  [ESpacing.MD]: '32rem',
  [ESpacing.LG]: '44rem',
  [ESpacing.XL]: '56rem',
} as const;

export const DIALOG_WRAPPER_CONSTANTS = {
  PANEL_CLASS: 'dialog-wrapper-panel',
  BACKDROP_CLASS: 'dialog-wrapper-backdrop',
  ROOT_CLASS: 'dialog-wrapper',
} as const;
