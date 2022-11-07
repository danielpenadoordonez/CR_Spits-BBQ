import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})

export class GestionProductoComponent implements AfterViewInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['producto']; //* La categoría es más para ordenarlo que otra cosa 

   //data table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   dataSource= new MatTableDataSource<any>();

  constructor(private gService: GenericService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.listaProductos();
    document.querySelectorAll('#product-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#product-table thead')[0].classList.add('grid-table-head');
  }

  listaProductos() {
    this.gService
      .list('productos/all-hability')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  //* Llamada en el front (click)="detalleProducto(item.id) 

  //* Sin problema
  detalleProducto(id: number) { //* Cuidado sino es númerico, OJO
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductoDetailComponent, dialogConfig);
  }

}
