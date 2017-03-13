import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PropietariosService, PropietarioFormService } from './shared';
import { PropietarioListComponent } from './propietario-list/propietario-list.component';
import { PropietarioDetailComponent } from './propietario-detail/propietario-detail.component';
import { PropietariosRoutingModule } from './propietarios-routing.module';
import { PropietarioFormComponent } from './propietario-form/propietario-form.component';
import { PropietarioEditComponent } from './propietario-edit/propietario-edit.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropietariosRoutingModule,
  ],
  declarations: [
    PropietarioListComponent,
    PropietarioDetailComponent,
    PropietarioFormComponent,
    PropietarioEditComponent],
  providers: [PropietariosService, PropietarioFormService]
})
export class PropietariosModule { }
