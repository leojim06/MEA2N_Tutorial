import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LukeSkywalkerComponent } from './luke-skywalker/luke-skywalker.component';
import { DarthVaderComponent } from './darth-vader/darth-vader.component';
import { ConfesionRoutingModule } from './confesion-routing.module';

@NgModule({
  imports: [CommonModule, ConfesionRoutingModule],
  declarations: [
    LukeSkywalkerComponent,
    DarthVaderComponent,
  ],
  exports: [DarthVaderComponent]
})
export class ConfesionModule { }
