import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  public getTranslation(lang: string): Observable<Translation> {
    return this._httpClient.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@Injectable({ providedIn: 'root' })
export class TranslocoScopeLoader implements TranslocoLoader {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  public getTranslation(path: string): Observable<Translation> {
    return this._httpClient.get<Translation>(`/assets/i18n/${path}.json`);
  }
}
