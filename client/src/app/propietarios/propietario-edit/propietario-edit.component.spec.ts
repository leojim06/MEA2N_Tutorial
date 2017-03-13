import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioEditComponent } from './propietario-edit.component';

describe('PropietarioEditComponent', () => {
  let component: PropietarioEditComponent;
  let fixture: ComponentFixture<PropietarioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietarioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
