import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservacionesRoutingModule } from './reservaciones-routing.module';
import { GestionReservacionesComponent } from './gestion-reservaciones/gestion-reservaciones.component';
import { ReservacionesFormComponent } from './reservaciones-form/reservaciones-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GestionReservacionesComponent,
    ReservacionesFormComponent
  ],
  imports: [
    CommonModule,
    ReservacionesRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class ReservacionesModule { }
