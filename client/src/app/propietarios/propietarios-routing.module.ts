import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropietarioListComponent } from './propietario-list/propietario-list.component';
import { PropietarioDetailComponent } from './propietario-detail/propietario-detail.component';
import { PropietarioFormComponent } from './propietario-form/propietario-form.component';
import { PropietarioEditComponent } from './propietario-edit/propietario-edit.component';

const propietariosRoutes: Routes = [
   { path: 'propietarios', component: PropietarioListComponent },
   { path: 'propietarios/new', component: PropietarioFormComponent },
   { path: 'propietarios/detail/:id', component: PropietarioDetailComponent },
   { path: 'propietarios/edit/:id', component: PropietarioEditComponent }
];

@NgModule({
   imports: [RouterModule.forChild(propietariosRoutes)],
   exports: [RouterModule]
})

export class PropietariosRoutingModule { }

