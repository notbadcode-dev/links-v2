import {
  EButtonWrapperColor,
  EButtonWrapperContentMode,
  EButtonWrapperVariant,
  EDialogWrapperContentType,
  ESpacing,
} from '@libs/enums';

import { IDeleteButtonButtonConfig, IDeleteButtonDialogConfig } from './delete-button.types';

export const DELETE_BUTTON_DEFAULT_BUTTON_CONFIG: Required<IDeleteButtonButtonConfig> = {
  title: 'Delete',
  tooltip: 'Delete',
  icon: '',
  svgIcon: 'delete-animated',
  contentMode: EButtonWrapperContentMode.ICON_TEXT,
  variant: EButtonWrapperVariant.FLAT,
  color: EButtonWrapperColor.WARN,
};

export const DELETE_BUTTON_DEFAULT_DIALOG_CONFIG: Required<IDeleteButtonDialogConfig> = {
  title: 'Confirm deletion',
  subtitle: 'This action cannot be undone',
  message: 'Do you want to delete this item?',
  acceptText: 'Delete',
  cancelText: 'Cancel',
  acceptColor: EButtonWrapperColor.WARN,
  cancelColor: EButtonWrapperColor.PRIMARY,
  size: ESpacing.SM,
  customClass: '',
  contentType: EDialogWrapperContentType.MESSAGE,
};
