import { EInputTextWrapperType } from './input-text-wrapper/input-text-wrapper.enum';

export interface IInputWrapperConfig {
  label: string;
  tooltip?: string;
  hideInternalLabel?: boolean;
  hideExternalLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  hint?: string;
  errorMessage?: string;
  tabindex?: number;
}

export interface IInputTextWrapperConfig extends IInputWrapperConfig {
  type?: EInputTextWrapperType;
}
