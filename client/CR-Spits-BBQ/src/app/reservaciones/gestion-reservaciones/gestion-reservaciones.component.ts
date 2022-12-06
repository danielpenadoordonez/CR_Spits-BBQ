import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-reservaciones',
  templateUrl: './gestion-reservaciones.component.html',
  styleUrls: ['./gestion-reservaciones.component.css']
})

export class GestionReservacionesComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(); //* Establecemos la fuente de data //- , 'acciones'
  displayedColumns = ['id', 'codigo', 'sucursal', 'usuario', 'cedula', 'cantidad', 'fecha_hora', 'acciones']; //* Mesas no van aquí

  constructor(private router: Router,
    private route: ActivatedRoute, private gService: GenericService) {
  }

  ngAfterViewInit(): void {
    this.listaReservaciones();
  }

  //* Obtenemos la lista de reservaciones
  listaReservaciones() {
    this.gService
      .list('reservaciones/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //* Filtro v2 by Marito
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  //* Actualizar Reservacion - Reservación usa id númerico
  actualizarReservacion(id: number) {
    this.router.navigate(['/reservaciones/update', id], {
      relativeTo: this.route,
    });
  }

  //* Crear Reservación
  crearReservacion() {
    this.router.navigate(['reservaciones/create'], {
      relativeTo: this.route,
    });
  }

  getCantidadTotalReservaciones(){
    let countReservations: number = 0;
    if (this.datos !== undefined) {
      countReservations = this.datos.map(t => t.id).reduce((partialSum: any, a: any) => partialSum + 1, 0);
    }
    return countReservations;
  }

}
