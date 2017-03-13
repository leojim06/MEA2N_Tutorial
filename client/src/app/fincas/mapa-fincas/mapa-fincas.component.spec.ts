import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaFincasComponent } from './mapa-fincas.component';

describe('MapaFincasComponent', () => {
  let component: MapaFincasComponent;
  let fixture: ComponentFixture<MapaFincasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaFincasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaFincasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
