import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MesaDetailComponent } from '../mesa-detail/mesa-detail.component';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css'],
})

export class GestionMesasComponent implements AfterViewInit {
  datos: any; //* Data
  destroy$: Subject<boolean> = new Subject<boolean>(); //* Suscripción
  displayedColumns = ['mesa']//* Columnas que se verán de las mesas, solo para MatTable

  //data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource= new MatTableDataSource<any>();

  constructor(private gService: GenericService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.listaMesas();
    document.querySelectorAll('#mesas-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#mesas-table thead')[0].classList.add('grid-table-head');
  }

  listaMesas() {
    this.gService
      .list('mesas/all-hability')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  //* Llamada en el front (click)="detalleMesa(item.id) - No sé si quiere trabajarlo por id o código

  //! ¿Qué no hay mesa by id? - Añadido
  detalleMesa(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MesaDetailComponent, dialogConfig);
  }
}
