import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IDashboardTotals {
  totalLinks: number;
  totalGroups: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _baseUrl: string = environment.linksApiUrl;

  public getTotals(): Observable<IDashboardTotals> {
    return this._http.get<IDashboardTotals>(`${this._baseUrl}/dashboard-links/summary`);
  }
}
