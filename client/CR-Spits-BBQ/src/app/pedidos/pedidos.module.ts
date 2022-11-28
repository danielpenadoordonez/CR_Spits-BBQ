import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTabsModule} from '@angular/material/tabs';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    GestionPedidosComponent,
    PedidoDetailComponent,
    PedidosFormComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,

 // Angular material 
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
 //   MatMomentDateModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    GestionPedidosComponent,
    PedidosFormComponent,
  ]
})

//* Pueden haber exports

export class PedidosModule { }
