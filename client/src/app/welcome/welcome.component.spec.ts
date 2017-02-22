import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './shared';
import { Observable } from 'rxjs/Rx';

class WelcomeServiceSpy {
  public getMessage(): Observable<any> {
    return Observable.of({ message: 'Hello World (^.^)' });
  }
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let welcomeService: WelcomeService;
  let wsSpy: WelcomeServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent]
    }).overrideComponent(WelcomeComponent, {
      set: {
        providers: [{ provide: WelcomeService, useClass: WelcomeServiceSpy }]
      }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    wsSpy = fixture.debugElement.injector.get(WelcomeService);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar el mensaje de bienvenida', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    component.ngOnInit();
    expect(compiled.querySelector('h2').textContent).toEqual('');
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toEqual('Hello World (^.^)');
  }));
});
