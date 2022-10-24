import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  displayedColumns = ['nombre', 'precio', 'imagen']; //* La categoría es más para ordenarlo que otra cosa 

  constructor(private gService: GenericService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.listaProductos();
  }

  listaProductos() {
    this.gService
      .list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  //* Llamada en el front (click)="detalleProducto(item.id) 

  //* Sin problema
  detallePedido(id: number) { //* Cuidado sino es númerico, OJO
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductoDetailComponent, dialogConfig);
  }

}
