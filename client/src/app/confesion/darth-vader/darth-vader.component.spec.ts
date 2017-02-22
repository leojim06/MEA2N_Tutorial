import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DarthVaderComponent } from './darth-vader.component';

@Directive({
  selector: 'app-luke-skywalker'
})
class MockLukeSkywalkerComponent {
  @Input() myConfesion: string;
  @Output() lukeAnswer = new EventEmitter;
}

describe('DarthVaderComponent', () => {
  let component: DarthVaderComponent;
  let fixture: ComponentFixture<DarthVaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // Se ingresan los componentes a probar (el componente principal)
      // y un componente falso que va a acutar como uno que se llama
      // en realida, el cual contiene una etiqueta.
      // El componente falso debe tener la misma etiqueta que el 
      // componente que se llama en realidad
      // parent (componente a probar) -> child (componente falso)
      declarations: [DarthVaderComponent, MockLukeSkywalkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarthVaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un tag <app-luke-skywalker>', () => {
    // Se obtiene la etiqueta del componente hijo para ver si fue 
    // creada correctamente 
    const mockLukeEl = fixture.debugElement.query(By.directive(MockLukeSkywalkerComponent));
    expect(mockLukeEl).toBeTruthy();
  });

  it('Debe enviar información al componente hijo', () => {
    // Se debe enviar el mensaje al componente hijo
    // Ya que el mensaje a enviar es propiedad del padre, se puede evaluar.
    // Se obtiene el componente hijo falso el cual debe recibir el mismo
    // mensaje enviado por el padre
    const mockLukeEl = fixture.debugElement.query(By.directive(MockLukeSkywalkerComponent));
    const mockLukeCmp = mockLukeEl.injector.get(MockLukeSkywalkerComponent) as MockLukeSkywalkerComponent;
    expect(mockLukeCmp).toBeTruthy();
    expect(mockLukeCmp.myConfesion).toBe('I am your father!');

  });

  it('Debe recibir el mensaje del componente hijo', () => {
    // Se espia (con Jasmine) la función onAnswer
    spyOn(component, 'onAnswer');
    const mockLukeEl = fixture.debugElement.query(By.directive(MockLukeSkywalkerComponent));
    const mockLukeCmp = mockLukeEl.injector.get(MockLukeSkywalkerComponent) as MockLukeSkywalkerComponent;

    // Se hace que el componente hijo falso emita para que sea capturado 
    // por el elemento padre y se evalua si la función fue llamada
    // Ya que no estamos probando si el mensaje del hijo llega bien al padre
    // no evaluamos ningun elemento en el componente padre que 
    // sea enviado por su hijo
    mockLukeCmp.lukeAnswer.emit();
    expect(component.onAnswer).toHaveBeenCalled();
  });
});
