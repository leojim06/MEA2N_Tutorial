import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasListComponent } from './fincas-list.component';

describe('FincasListComponent', () => {
  let component: FincasListComponent;
  let fixture: ComponentFixture<FincasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FincasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FincasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
