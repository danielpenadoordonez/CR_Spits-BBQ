import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';

const routes: Routes = [
  { path: 'pedidos', component: GestionPedidosComponent },
  //{ path: 'pedidos/create', component: PedidosFormComponent },
  //{ path: 'pedidos/update/:id', component: PedidosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
