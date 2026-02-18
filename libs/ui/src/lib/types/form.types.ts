import { FormControl } from '@angular/forms';

export type TFormGroupType<TValue> = {
  [K in keyof TValue]: FormControl<TValue[K]>;
};
