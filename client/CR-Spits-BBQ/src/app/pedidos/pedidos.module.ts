import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GestionPedidosComponent,
    PedidoDetailComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatDialogModule,
    MatIconModule
  ]
})

//* Pueden haber exports

export class PedidosModule { }
