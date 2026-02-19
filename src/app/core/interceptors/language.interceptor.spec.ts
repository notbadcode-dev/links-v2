import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { languageInterceptor } from './language.interceptor';

describe('languageInterceptor', () => {
  it('adds Accept-Language header', () => {
    const req = new HttpRequest('GET', '/test');
    const next = vi.fn(() => of({ ok: true }));

    languageInterceptor(req, next).subscribe();

    const modifiedReq = next.mock.calls[0]?.[0] as HttpRequest<unknown>;
    expect(modifiedReq.headers.get('Accept-Language')).toBe('ES');
  });
});
