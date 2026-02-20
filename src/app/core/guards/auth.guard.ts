import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { SessionService } from '@app/core/services/session.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([ROUTES_CONSTANTS.AUTH.LOGIN]);
};
