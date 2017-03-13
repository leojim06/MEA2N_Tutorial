import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioFincasDetailComponent } from './propietario-fincas-detail.component';

describe('PropietarioFincasDetailComponent', () => {
  let component: PropietarioFincasDetailComponent;
  let fixture: ComponentFixture<PropietarioFincasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietarioFincasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietarioFincasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
