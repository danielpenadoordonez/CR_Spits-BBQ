import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';


@NgModule({
  declarations: [
    GestionMesasComponent
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
