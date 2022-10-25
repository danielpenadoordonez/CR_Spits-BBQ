import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})

//* Corresponde al detalle del producto
export class ProductoDetailComponent implements OnInit {
  datos: any; //* Data
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ProductoDetailComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id !== undefined) {
      this.obtenerProductoByID(this.datosDialog.id);
    }
  }

  //? Sí hay producto by id
  obtenerProductoByID(id: any) {
    this.gService
      .get('productos/', id)
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
