import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WelcomeService } from './welcome.service';
import { ConfigService } from '../../shared';

describe('WelcomeService', () => {

  // let service: WelcomeService;
  // let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        WelcomeService,
        ConfigService,
        {
          provide: Http,
          useFactory: (mockbackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockbackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  it('Debe inicializar el servicio',
    inject([WelcomeService, MockBackend],
      (service: WelcomeService, mockbackend: MockBackend) => {
        expect(service).toBeTruthy();
      }));

  it('Debe retornar el mensaje de bienvenida del servidor',
    inject([WelcomeService, MockBackend],
      (service: WelcomeService, mockbackend: MockBackend) => {
        const mockResponse = { data: 'Hello World (^.^)' };
        mockbackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        service.getMessage().subscribe((message) => {
          expect(message.data).toEqual('Hello World (^.^)');
        })
      }));

  // METODO ALTERNATIVO para no hacer el inject en cada spect (it)
  // Se crea una funcion beforEach y se asignan los valores obtenidos 
  // a dos variables globales service & mockbackend
  //
  // beforeEach(inject([WelcomeService, MockBackend],
  //   (s: WelcomeService, mb: MockBackend) => {
  //     service = s;
  //     mockbackend = mb;
  //   }));

  // it('Debe inicializar el servicio', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('Debe retornar el mensaje de bienvenida del servidor', () => {
  //   const mockResponse = { data: 'Hello World (^.^)'};
  //   mockbackend.connections.subscribe((connection) => {
  //     connection.mockRespond(new Response(new ResponseOptions({
  //       body: JSON.stringify(mockResponse)
  //     })));
  //   });
  //   service.getMessage().subscribe((message) => {
  //     expect(message.data).toEqual('Hello World (^.^)');
  //   });
  // });


});
