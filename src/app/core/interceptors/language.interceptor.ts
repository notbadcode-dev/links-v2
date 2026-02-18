import { HttpInterceptorFn } from '@angular/common/http';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const language = 'ES';

  const modifiedReq = req.clone({
    setHeaders: {
      'Accept-Language': language,
    },
  });

  return next(modifiedReq);
};
