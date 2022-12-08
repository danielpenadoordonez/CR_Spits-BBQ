import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from '../mesas/gestion-mesas/gestion-mesas.component';
import { MesasFormComponent } from '../mesas/mesas-form/mesas-form.component';
import { GestionPedidosComponent } from '../pedidos/gestion-pedidos/gestion-pedidos.component';
import { PagoFormComponent } from '../pedidos/pago-form/pago-form.component';
import { PedidosFormComponent } from '../pedidos/pedidos-form/pedidos-form.component';
import { ReporteFechasComponent } from '../pedidos/reporte-fechas/reporte-fechas.component';
import { ReporteMixtoComponent } from '../pedidos/reporte-mixto/reporte-mixto.component';
import { ReporteTipoPagoComponent } from '../pedidos/reporte-tipo-pago/reporte-tipo-pago.component';
import { GestionProductoComponent } from '../productos/gestion-producto/gestion-producto.component';
import { ProductosFormComponent } from '../productos/productos-form/productos-form.component';
import { GestionReservacionesComponent } from '../reservaciones/gestion-reservaciones/gestion-reservaciones.component';
import { ReservacionesFormComponent } from '../reservaciones/reservaciones-form/reservaciones-form.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { GestionUsuariosComponent } from '../user/gestion-usuarios/gestion-usuarios.component';
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
        path: 'reservaciones',
        canActivate: [AuthGuard],
        component: GestionReservacionesComponent,
        data: {
          roles: ['Administrador', 'Mesero', 'Cliente'],
        }
      },
      {
        path: 'usuarios', //* Lista de usuarios
        canActivate: [AuthGuard],
        component: GestionUsuariosComponent,
        data: {
          roles: ['Administrador'],
        }
      },
      {
        path: 'ordenar', //* Para el cliente
        canActivate: [AuthGuard],
        component: GestionPedidosComponent,
        data: {
          roles: ['Cliente'],
        }
      },
      {
        path: 'pedidos/pago',
        canActivate: [AuthGuard],
        component: PagoFormComponent,
        data: {
          roles: ['Administrador', 'Cliente'],
        }
      },
      {
        path: 'reportes/fecha',
        canActivate: [AuthGuard],
        component: ReporteFechasComponent,
        data: {
          roles: ['Administrador'],
        }
      },
      {
        path: 'reportes/tipopago',
        canActivate: [AuthGuard],
        component: ReporteTipoPagoComponent,
        data: {
          roles: ['Administrador'],
        }
      },
      {
        path: 'reportes/mixtos', //? Lo puede ver el mesero, pero con restricciones
        canActivate: [AuthGuard],
        component: ReporteMixtoComponent,
        data: {
          roles: ['Administrador', 'Mesero'],
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
      {
        path: 'reservaciones/update/:id',
        canActivate: [AuthGuard],
        component: ReservacionesFormComponent,
        data: {
          roles: ['Administrador'],
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }