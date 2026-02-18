import { Directive, inject } from '@angular/core';

import { DISABLE_ON_LOADING } from '@libs/ui';
import { LoadingService } from '@app/core/services/loading.service';

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
