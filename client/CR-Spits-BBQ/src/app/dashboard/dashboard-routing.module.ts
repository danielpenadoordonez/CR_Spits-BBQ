import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from '../mesas/gestion-mesas/gestion-mesas.component';
import { MesasFormComponent } from '../mesas/mesas-form/mesas-form.component';
import { GestionPedidosComponent } from '../pedidos/gestion-pedidos/gestion-pedidos.component';
import { GestionProductoComponent } from '../productos/gestion-producto/gestion-producto.component';
import { BodyIndexComponent } from './body-index/body-index.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardIndexComponent, children: [
    // Rutas de primer nivel
    { path: 'mesas', component: GestionMesasComponent},
    { path: 'main', component: BodyIndexComponent},
    { path: 'productos', component: GestionProductoComponent},
    { path: 'comandas', component: GestionPedidosComponent},
    { path: 'comandas', component: GestionPedidosComponent},
    { path: 'mesas/create', component: MesasFormComponent },

    // Rutas de segundo nivel
    { path: 'mesas/update/:id', component: MesasFormComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }