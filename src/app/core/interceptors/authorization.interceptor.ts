import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { SessionService } from '@app/core/services/session.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const accessToken = sessionService.accessToken();

  if (!accessToken) {
    return next(req);
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(modifiedReq);
};
