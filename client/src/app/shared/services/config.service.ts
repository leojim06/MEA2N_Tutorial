import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private URI: string = '';
  private apiURI: string = '';

  constructor() {
    this.URI = 'http://localhost:3000';
    this.apiURI = 'http://localhost:3000/api/v1';
  }

  get url() {
    return this.apiURI;
  }

  get host() {
    return this.URI;
  }

}
