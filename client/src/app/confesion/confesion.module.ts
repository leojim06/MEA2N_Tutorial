import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LukeSkywalkerComponent } from './luke-skywalker/luke-skywalker.component';
import { DarthVaderComponent } from './darth-vader/darth-vader.component';
// import { ConfesionComponent } from './confesion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LukeSkywalkerComponent,
    DarthVaderComponent,
    // ConfesionComponent
  ],
  // exports: [ConfesionComponent]
  exports: [DarthVaderComponent]
})
export class ConfesionModule { }
