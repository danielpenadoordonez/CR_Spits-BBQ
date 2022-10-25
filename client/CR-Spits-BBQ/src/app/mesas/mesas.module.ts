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

@NgModule({
  declarations: [
    GestionMesasComponent,
    MesaDetailComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
  ],
  exports: [
    GestionMesasComponent
  ]
})
export class MesasModule { }
