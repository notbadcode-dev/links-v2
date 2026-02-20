import { Directive, inject } from '@angular/core';

import { LoadingService } from '@app/core/services/loading.service';

import { DISABLE_ON_LOADING } from '@libs/tokens';

@Directive({
  selector: '[disableOnLoading]',
  standalone: true,
  providers: [
    {
      provide: DISABLE_ON_LOADING,
      useFactory: () => inject(LoadingService).isLoading,
    },
  ],
})
export class DisableOnLoadingDirective {}
