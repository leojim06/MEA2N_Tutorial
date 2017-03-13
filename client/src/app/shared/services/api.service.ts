import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { JwtService } from './jwt.service';

import { NotificationsService } from 'angular2-notifications';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private jwtService: JwtService,
    private notificationsService: NotificationsService,
    private slimLoadingBarService: SlimLoadingBarService) { }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatError(error: any) {
    console.error("El Error es: " + JSON.stringify(error));
    if (error.status === 0) {
      error._body = {
        "ERROR": "Error en el servidor",
        "MSG": "El servidor no responde"
      }
    }
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()) {
    this.slimLoadingBarService.start();
    return this.http.get(`${environment.apiURL}${path}`,
      {
        headers: this.setHeaders(),
        search: params
      })
      .catch(this.formatError)
      .map((res: Response) => res.json())
      .finally(() => this.slimLoadingBarService.complete());
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.slimLoadingBarService.start();
    return this.http.put(`${environment.apiURL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json())
      .finally(() => this.slimLoadingBarService.complete());
  }

  post(path: string, body: Object = {}): Observable<any> {
    this.slimLoadingBarService.start();
    return this.http.post(`${environment.apiURL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json())
      .finally(() => this.slimLoadingBarService.complete());
  }

  delete(path): Observable<any> {
    this.slimLoadingBarService.start();
    return this.http.delete(`${environment.apiURL}${path}`,
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json())
      .finally(() => this.slimLoadingBarService.complete());
  }

}
