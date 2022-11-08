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
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosAllComponent } from './productos-all/productos-all.component'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    ProductoDetailComponent,
    GestionProductoComponent,
    ProductosFormComponent,
    ProductosAllComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    //* angular material
    MatDialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [
    GestionProductoComponent,
  ]
})

//* Pueden haber exports

export class ProductosModule { }
