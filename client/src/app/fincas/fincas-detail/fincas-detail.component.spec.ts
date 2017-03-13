import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasDetailComponent } from './fincas-detail.component';

describe('FincasDetailComponent', () => {
  let component: FincasDetailComponent;
  let fixture: ComponentFixture<FincasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FincasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FincasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
