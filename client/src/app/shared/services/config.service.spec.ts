import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [ConfigService]
      });
   });

   it('Debe inicializar el service',
      inject([ConfigService], (service: ConfigService) => {
         expect(service).toBeTruthy();
      }));

   it('Debe retornar la URI y la apiURI',
      inject([ConfigService], (service: ConfigService) => {
         expect(service.url).toEqual('http://localhost:3000/api/v1');
         expect(service.host).toEqual('http://localhost:3000');
      }));
});
