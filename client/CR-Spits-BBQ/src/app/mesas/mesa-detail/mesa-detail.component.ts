import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mesa-detail',
  templateUrl: './mesa-detail.component.html',
  styleUrls: ['./mesa-detail.component.css']
})

//* Corresponde al detalle de la mesa
export class MesaDetailComponent implements OnInit {
  datos: any; //* Datos - con un if sirve para saber si tiene data o no
  datosDialog: any; //* Datos para el dialog
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<MesaDetailComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id !== undefined) {  //* Sino es undefined
      this.obtenerMesaByID(this.datosDialog.id);
    }
  }

  obtenerMesaByID(id: any) {
    this.gService
      .get('mesas/', id)
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
