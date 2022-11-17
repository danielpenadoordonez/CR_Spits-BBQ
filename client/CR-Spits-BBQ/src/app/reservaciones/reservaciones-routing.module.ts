import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductoComponent } from '../productos/gestion-producto/gestion-producto.component';
import { ReservacionesFormComponent } from './reservaciones-form/reservaciones-form.component';

const routes: Routes = [
    //* Rutas ordenadas 
    { path: 'reservaciones', component: GestionProductoComponent },
    { path: 'reservaciones/create', component: ReservacionesFormComponent },
    { path: 'reservaciones/update/:id', component: ReservacionesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservacionesRoutingModule { }
