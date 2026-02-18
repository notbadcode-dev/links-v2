import { DestroyRef, Directive, inject } from '@angular/core';

@Directive()
export abstract class BaseDirective {
  protected readonly _destroyRef: DestroyRef = inject(DestroyRef);
  protected readonly _componentName: string = this.constructor.name;
}
