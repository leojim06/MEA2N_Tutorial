import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LukeSkywalkerComponent } from './luke-skywalker.component';

describe('LuckSkywalkerComponent', () => {
  let component: LukeSkywalkerComponent;
  let fixture: ComponentFixture<LukeSkywalkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LukeSkywalkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LukeSkywalkerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe recibir un string por @input y mostrarlo en el view', async(() => {
    component.myConfesion = 'I am your Father!';
    fixture.detectChanges();
    let element = fixture.nativeElement;
    let de = fixture.debugElement;
    fixture.whenStable().then(() => {
      expect(element.querySelector('span').innerText).toBe('I am your Father!');
      expect(de.query(By.css('span')).nativeElement.innerText).toBe('I am your Father!');
    });
  }));
});
