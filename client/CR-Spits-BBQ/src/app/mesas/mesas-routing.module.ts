import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';

const routes: Routes = [
  { path: 'mesas', component: GestionMesasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRoutingModule { }
