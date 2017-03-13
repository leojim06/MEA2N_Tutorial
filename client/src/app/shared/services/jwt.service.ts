import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): string {
    return window.sessionStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.sessionStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.sessionStorage.removeItem('jwtToken');
  }
}
