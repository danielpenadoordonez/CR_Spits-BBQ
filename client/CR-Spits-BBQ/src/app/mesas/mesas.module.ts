import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import { MesaDetailComponent } from './mesa-detail/mesa-detail.component';


@NgModule({
  declarations: [
    GestionMesasComponent,
    MesaDetailComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule
  ],
  exports: [
    GestionMesasComponent
  ]
})
export class MesasModule { }
