import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

export interface ILinksHealthControllerHealthzParams {}

export function linksHealthControllerHealthz(
  http: HttpClient,
  rootUrl: string,
  params?: ILinksHealthControllerHealthzParams,
  context?: HttpContext,
): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, linksHealthControllerHealthz.PATH, 'get');
  if (params) {
  }

  return http.request(rb.build({ responseType: 'text', accept: '*/*', context })).pipe(
    filter((r: unknown): r is HttpResponse<string> => r instanceof HttpResponse),
    map((r: HttpResponse<string>) => {
      return r.clone({ body: undefined }) as StrictHttpResponse<void>;
    }),
  );
}

linksHealthControllerHealthz.PATH = '/healthz';
