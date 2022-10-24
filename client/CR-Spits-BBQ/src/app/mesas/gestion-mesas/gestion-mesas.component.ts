import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  displayedColumns = ['codigo', 'capacidad', 'estado']; //* Columnas que se verán de las mesas, solo para MatTable

  constructor(private gService: GenericService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.listaMesas();
  }

  listaMesas() {
    this.gService
      .list('mesas/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
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
