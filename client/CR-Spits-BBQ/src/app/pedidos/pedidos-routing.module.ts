import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';

const routes: Routes = [
  {
    path: 'pedidos', 
    canActivate: [AuthGuard], 
    component: GestionPedidosComponent, data: {
      roles: ['Administrador', 'Mesero'],
    },
  },
  //{ path: 'pedidos/create', component: PedidosFormComponent },
  //{ path: 'pedidos/update/:id', component: PedidosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
