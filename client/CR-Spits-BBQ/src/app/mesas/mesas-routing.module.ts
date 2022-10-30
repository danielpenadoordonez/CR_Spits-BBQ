import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import { MesaDetailComponent } from './mesa-detail/mesa-detail.component';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasFormComponent } from './mesas-form/mesas-form.component';

const routes: Routes = [
  //* Orden de las rutas
  { path: 'mesas', component: GestionMesasComponent },
  { path: 'mesas/all', component: MesasAllComponent },
  { path: 'mesas/create', component: MesasFormComponent },
  { path: 'mesas/update/:id', component: MesasFormComponent }
];

//* Ruta con el id eliminada, ya que es innecesaria

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MesasRoutingModule { }
