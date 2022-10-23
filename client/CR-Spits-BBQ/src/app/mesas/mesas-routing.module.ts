import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import { MesaDetailComponent } from './mesa-detail/mesa-detail.component';

const routes: Routes = [
  //* Orden de las rutas
  { path: 'mesas', component: GestionMesasComponent },
  { path: 'mesas/:id', component: MesaDetailComponent },
  //* falta ruta para create y update
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MesasRoutingModule { }
