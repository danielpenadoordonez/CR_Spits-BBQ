import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { PedidoDetailComponent } from '../pedido-detail/pedido-detail.component';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})

export class GestionPedidosComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['pedido'];

  //data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource= new MatTableDataSource<any>();

  constructor(private gService: GenericService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.listaPedidos();
    document.querySelectorAll('#pedido-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#pedido-table thead')[0].classList.add('grid-table-head');
  }

  listaPedidos() {
    this.gService
      .list('pedidos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  //* Llamada en el front (click)="detallePedido(item.id) 

  //! Hay un problemón y es que no hay forma de obtener un detalle(s) de pedido por medio de un id
  detallePedido(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidoDetailComponent, dialogConfig);
  }

}
