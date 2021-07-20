import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HealthStatus} from "@core/domain/health-status";
import {API_V1_HEALTH} from "@core/config/api-routes.const";

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) { }

  public getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(API_V1_HEALTH);
  }
}
