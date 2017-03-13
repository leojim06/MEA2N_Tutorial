import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ApiService } from '../../../shared';
import { Finca } from '../models/finca.model';

@Injectable()
export class FincasService {

  private path: string = '';

  constructor(private apiService: ApiService) {
    this.path = '/fincas/';
  }

  get(id: string): Observable<any> {
    return this.apiService.get(this.path + id)
      .map(data => data.RESULT);
  }

  create(propietario_id: string, finca: Finca): Observable<Finca> {
    return this.apiService.post('/propietarios/' + propietario_id + this.path, finca)
      .map(data => data.CREATED);
  }

  update(finca: Finca): Observable<Finca> {
    return this.apiService.put(this.path + finca._id, finca)
      .map(data => data.UPDATED);
  }

  destroy(id: string): Observable<any> {
    return this.apiService.delete(this.path + id)
      .map(data => data.DELETED);
  }

  populate(propietario_id: string): Observable<any> {
    return this.apiService.get('/propietarios/' + propietario_id + this.path)
      .map(data => data.RESULT);
  }

}
