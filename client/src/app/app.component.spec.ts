import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

import { Directive } from '@angular/core';

@Directive({
   selector: 'app-welcome'
})
class MockAppWelcome { }

@Directive({
   selector: 'app-darth-vader'
})
class MockAppDarthVader { }

describe('AppComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [
            AppComponent,
            MockAppWelcome,
            MockAppDarthVader
         ]
      });
      TestBed.compileComponents();
   });

   it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
   }));

   it(`should have as title 'app works!'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app works!');
   }));

   it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('app works!');
   }));

   it('Debe tener un tag <app-darth-vader>', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const mockAppConfesionEl = fixture.debugElement.query(By.directive(MockAppDarthVader));
      expect(mockAppConfesionEl).toBeTruthy();
   }));

   it('Debe tener un tag <app-welcome>', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const mockAppWelcomeEl = fixture.debugElement.query(By.directive(MockAppWelcome));
      expect(mockAppWelcomeEl).toBeTruthy();
   }));

});
