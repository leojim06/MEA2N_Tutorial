import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FincasListComponent } from './fincas-list/fincas-list.component';
import { FincasDetailComponent } from './fincas-detail/fincas-detail.component';
import { FincasRoutingModule } from './fincas-routing.module';
import { FincasService, FincasFormService } from './shared';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { StyledMapDirective } from './shared/directives/styled-map.directive';
import { MapaFincasComponent } from './mapa-fincas/mapa-fincas.component';
import { PropietarioFincasDetailComponent } from './propietario-fincas-detail/propietario-fincas-detail.component';
import { FincasFormComponent } from './fincas-form/fincas-form.component';
import { FincasEditComponent } from './fincas-edit/fincas-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FincasRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule
  ],
  declarations: [
    FincasListComponent,
    FincasDetailComponent,
    StyledMapDirective,
    MapaFincasComponent,
    PropietarioFincasDetailComponent,
    FincasFormComponent,
    FincasEditComponent
  ],
  providers: [FincasService, FincasFormService]
})
export class FincasModule { }
