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
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { ReporteFechasComponent } from './reporte-fechas/reporte-fechas.component';
import { ReporteTipoPagoComponent } from './reporte-tipo-pago/reporte-tipo-pago.component';
import { ReporteMixtoComponent } from './reporte-mixto/reporte-mixto.component';
import { PagoFormComponent } from './pago-form/pago-form.component';

@NgModule({
  declarations: [
    GestionPedidosComponent,
    PedidoDetailComponent,
    PedidosFormComponent,
    ReporteFechasComponent,
    ReporteTipoPagoComponent,
    ReporteMixtoComponent,
    PagoFormComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,

    //* Angular material 
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatBadgeModule,
    //* Mate date - Filtros x fecha
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    //* Form
    ReactiveFormsModule,
  ],
  exports: [
    GestionPedidosComponent,
    PedidosFormComponent,
  ]
})

//* Pueden haber exports

export class PedidosModule { }
