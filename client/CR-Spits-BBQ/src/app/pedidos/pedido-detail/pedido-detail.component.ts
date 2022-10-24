import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})

//* Corresponde al detalle(s) del pedido (comanda)
export class PedidoDetailComponent implements OnInit {
  datos: any; //* Data
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<PedidoDetailComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id !== undefined) {
      this.obtenerDetallesByOrderID(this.datosDialog.id);
    }
  }

  //! Ya funciona!!
  //? Tener en cuenta que se recibe un array de detalles, no uno solo...
  obtenerDetallesByOrderID(id: any) {
    this.gService
      .get('detalles-pedido/', id) 
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });

  }
  close() {
    this.dialogRef.close();
  }

}
