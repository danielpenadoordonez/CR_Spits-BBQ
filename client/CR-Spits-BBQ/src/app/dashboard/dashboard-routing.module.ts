import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from '../mesas/gestion-mesas/gestion-mesas.component';
import { MesasFormComponent } from '../mesas/mesas-form/mesas-form.component';
import { GestionPedidosComponent } from '../pedidos/gestion-pedidos/gestion-pedidos.component';
import { PedidosFormComponent } from '../pedidos/pedidos-form/pedidos-form.component';
import { GestionProductoComponent } from '../productos/gestion-producto/gestion-producto.component';
import { ProductosFormComponent } from '../productos/productos-form/productos-form.component';
import { ReservacionesFormComponent } from '../reservaciones/reservaciones-form/reservaciones-form.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { BodyIndexComponent } from './body-index/body-index.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardIndexComponent, children: [
      //* Rutas de primer nivel
      {
        path: 'mesas',
        canActivate: [AuthGuard],
        component: GestionMesasComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'main',
        canActivate: [AuthGuard],
        component: BodyIndexComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'productos',
        canActivate: [AuthGuard],
        component: GestionProductoComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'comandas',
        canActivate: [AuthGuard],
        component: GestionPedidosComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'mesas/create',
        canActivate: [AuthGuard],
        component: MesasFormComponent,
        data: {
          roles: ['Administrador', 'Mesero'],
        }
      },
      {
        path: 'productos/create',
        canActivate: [AuthGuard],
        component: ProductosFormComponent,
        data: {
          roles: ['Administrador', 'Mesero'],
        }
      },
      {
        path: 'mesas/pedidos/create',
        canActivate: [AuthGuard],
        component: PedidosFormComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'mesas/reservaciones/create',
        canActivate: [AuthGuard],
        component: ReservacionesFormComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      //* Rutas de segundo nivel
      {
        path: 'mesas/update/:id',
        canActivate: [AuthGuard],
        component: MesasFormComponent,
        data: {
          roles: ['Administrador', 'Mesero'],
        }
      },
      {
        path: 'productos/update/:id',
        canActivate: [AuthGuard],
        component: ProductosFormComponent,
        data: {
          roles: ['Administrador', 'Mesero'],
        }
      },
      {
        path: 'comandas/update/:id',
        canActivate: [AuthGuard],
        component: PedidosFormComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'mesas/pedidos/update/:id',
        canActivate: [AuthGuard],
        component: PedidosFormComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }