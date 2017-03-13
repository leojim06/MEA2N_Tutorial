import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DarthVaderComponent } from './darth-vader/darth-vader.component';

const confesionRoutes: Routes = [
   { path: 'confesion', component: DarthVaderComponent }
]

@NgModule({
   imports: [RouterModule.forChild(confesionRoutes)],
   exports: [RouterModule]
})

export class ConfesionRoutingModule { }