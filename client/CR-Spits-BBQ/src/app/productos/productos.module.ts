import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { GestionProductoComponent } from './gestion-producto/gestion-producto.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider'; 

@NgModule({
  declarations: [
    ProductoDetailComponent,
    GestionProductoComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,

    // angular material
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
  ],
  exports: [
    GestionProductoComponent,
  ]
})

//* Pueden haber exports

export class ProductosModule { }
