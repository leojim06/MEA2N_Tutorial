import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Propietario } from './propietario.model';
import { ApiService } from '../../shared'

@Injectable()
export class PropietariosService {

  private path: string = '';

  constructor(private apiService: ApiService) {
    this.path = '/propietarios/';
  }

  get(id: string): Observable<any>  {
    return this.apiService.get(this.path + id)
      .map(data => data.RESULT);
  }

  save(propietario: Propietario): Observable<any> {
    if (propietario._id) {
      return this.apiService.put(this.path + propietario._id, propietario)
        .map(data => data.UPDATED);
    } else {
      return this.apiService.post(this.path, propietario)
        .map(data => data.CREATED);
    }
  }

  destroy(id: string): Observable<any> {
    return this.apiService.delete(this.path + id)
      .map(data => data.DELETED);
  }
}
