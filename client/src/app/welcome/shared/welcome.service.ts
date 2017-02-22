import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../../shared';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WelcomeService {

  private welcomeURL: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService,
  ) {
    this.welcomeURL = `${configService.host}`;
  }

  getMessage(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.welcomeURL)
      .map((res: Response) => { return res.json() })
      .catch(this.errorHandler);
  }

  private errorHandler(error: Response): Observable<any> {
    return Observable.throw(error || 'Error en el servidor');
  }

}
