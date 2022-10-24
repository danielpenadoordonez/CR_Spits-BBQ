import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { GestionProductoComponent } from './gestion-producto/gestion-producto.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProductoDetailComponent,
    GestionProductoComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatDialogModule,
    MatIconModule
  ]
})

//* Pueden haber exports

export class ProductosModule { }
