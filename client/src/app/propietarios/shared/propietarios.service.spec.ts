import { TestBed, inject } from '@angular/core/testing';
import { PropietariosService } from './propietarios.service';

describe('PropietariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropietariosService]
    });
  });

  it('should ...', inject([PropietariosService], (service: PropietariosService) => {
    expect(service).toBeTruthy();
  }));
});
