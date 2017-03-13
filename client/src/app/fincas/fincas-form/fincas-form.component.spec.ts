import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasFormComponent } from './fincas-form.component';

describe('FincasFormComponent', () => {
  let component: FincasFormComponent;
  let fixture: ComponentFixture<FincasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FincasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FincasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
