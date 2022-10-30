import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesasRoutingModule } from './mesas-routing.module';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import { MesaDetailComponent } from './mesa-detail/mesa-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MesasAllComponent } from './mesas-all/mesas-all.component'; 

@NgModule({
  declarations: [
    GestionMesasComponent,
    MesaDetailComponent,
    MesasFormComponent,
    MesasAllComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,

     // Angular material 
    MatDialogModule,
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
    GestionMesasComponent
  ]
})
export class MesasModule { }
