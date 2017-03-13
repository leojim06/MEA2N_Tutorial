import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FincasListComponent } from './fincas-list/fincas-list.component';
import { FincasDetailComponent } from './fincas-detail/fincas-detail.component';
import { PropietarioFincasDetailComponent } from './propietario-fincas-detail/propietario-fincas-detail.component';
import { FincasFormComponent } from './fincas-form/fincas-form.component';
import { FincasEditComponent } from './fincas-edit/fincas-edit.component';

const fincasRoutes: Routes = [
   { path: 'fincas', component: FincasListComponent },
   { path: 'fincas/detail/:id', component: FincasDetailComponent },
   { path: 'propietarios/fincas/detail/:id', component: PropietarioFincasDetailComponent },
   { path: 'propietarios/fincas/new/:id', component: FincasFormComponent },
   { path: 'fincas/edit/:id', component: FincasEditComponent }
   // {path: 'maps', component: FincasDetailComponent}

];

@NgModule({
   imports: [RouterModule.forChild(fincasRoutes)],
   exports: [RouterModule]
})

export class FincasRoutingModule { }