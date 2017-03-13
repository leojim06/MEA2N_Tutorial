import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioDetailComponent } from './propietario-detail.component';

describe('PropietarioDetailComponent', () => {
  let component: PropietarioDetailComponent;
  let fixture: ComponentFixture<PropietarioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietarioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
