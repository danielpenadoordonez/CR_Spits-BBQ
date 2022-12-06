import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reservacion-detail',
  templateUrl: './reservacion-detail.component.html',
  styleUrls: ['./reservacion-detail.component.css']
})
export class ReservacionDetailComponent implements OnInit {
  datos: any; 
  datosDialog: any; 
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ReservacionDetailComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }


  ngOnInit(): void { 
    //* Validamos
    if (this.datosDialog.id !== undefined) {  
      this.getReservationByID(this.datosDialog.id);
      document.querySelector('.mat-dialog-container').classList.add('no-padding-bottom');
    }
  }

  getReservationByID(id: any) {
    this.gService
      .get('reservaciones', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        //* Nota: Sí sirve
      });
  }
  
  close() {
    this.dialogRef.close();
  }

}
