import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from '../mesas/gestion-mesas/gestion-mesas.component';
import { GestionProductoComponent } from '../productos/gestion-producto/gestion-producto.component';
import { BodyIndexComponent } from './body-index/body-index.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardIndexComponent, children: [
    { path: 'mesas', component: GestionMesasComponent},
    { path: 'main', component: BodyIndexComponent},
    { path: 'productos', component: GestionProductoComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }