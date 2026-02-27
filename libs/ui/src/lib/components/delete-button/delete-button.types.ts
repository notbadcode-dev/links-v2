import {
  EButtonWrapperColor,
  EButtonWrapperContentMode,
  EButtonWrapperVariant,
  ESpacing,
} from '@libs/enums';
import { EDialogWrapperContentType } from '@libs/wrappers';

export interface IDeleteButtonButtonConfig {
  title: string;
  tooltip?: string;
  icon?: string;
  svgIcon?: string;
  contentMode?: EButtonWrapperContentMode;
  variant?: EButtonWrapperVariant;
  color?: EButtonWrapperColor;
}

export interface IDeleteButtonDialogConfig {
  title: string;
  subtitle?: string;
  message: string;
  acceptText: string;
  cancelText: string;
  acceptColor?: EButtonWrapperColor;
  cancelColor?: EButtonWrapperColor;
  size?: ESpacing;
  customClass?: string;
  contentType?: EDialogWrapperContentType;
}
