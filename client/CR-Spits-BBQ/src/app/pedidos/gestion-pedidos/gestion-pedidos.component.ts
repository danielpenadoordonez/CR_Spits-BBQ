import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  displayedColumns = ['id', 'nombre', 'precio', 'idCliente', 'idMesero', 'fecha', 'idEstado', 'idMesa'];

  constructor(private gService: GenericService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.listaPedidos();
  }

  listaPedidos() {
    this.gService
      .list('pedidos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
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
