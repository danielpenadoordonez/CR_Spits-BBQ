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
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    GestionReservacionesComponent,
    ReservacionesFormComponent
  ],
  imports: [
    CommonModule,
    ReservacionesRoutingModule,
    //* Angular material
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
    MatMomentDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    //* Libreria @angular-material-components/datetime-picker
    NgxMatDatetimePickerModule, 
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]
})

export class ReservacionesModule { }
