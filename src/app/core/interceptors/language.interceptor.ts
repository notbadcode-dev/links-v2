import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { I18nService } from '@app/core/i18n';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const i18nService = inject(I18nService);
  const language = i18nService.currentLanguageSignal() || i18nService.currentLanguage;

  const modifiedReq = req.clone({
    setHeaders: {
      'Accept-Language': language,
    },
  });

  return next(modifiedReq);
};
