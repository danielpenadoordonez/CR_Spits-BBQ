import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';

const routes: Routes = [
  { path: 'pedidos', component: GestionPedidosComponent },
  { path: 'pedidos/:id', component: PedidoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
