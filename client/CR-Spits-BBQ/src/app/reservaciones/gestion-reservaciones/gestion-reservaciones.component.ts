import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReservacionDetailComponent } from '../reservacion-detail/reservacion-detail.component';

@Component({
  selector: 'app-gestion-reservaciones',
  templateUrl: './gestion-reservaciones.component.html',
  styleUrls: ['./../../productos/gestion-producto/gestion-producto.component.css', './gestion-reservaciones.component.css']
})

export class GestionReservacionesComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(); //* Establecemos la fuente de data //- , 'acciones'
  displayedColumns = ['reserva']//['id', 'codigo', 'sucursal', 'usuario', 'cedula', 'cantidad', 'fecha_hora', 'acciones']; //* Mesas no van aquí
  currentUser: any; //* El usuario conectado
  isAuthenticated: boolean = false; //* Es para saber si está o no autentificado

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private gService: GenericService) {
  }

  ngOnInit() {
    //* Primero cargamos al usuario
    this.getCurrentUser();
  }

  ngAfterViewInit(): void {
    this.listaReservaciones();
    document.querySelectorAll('#reserva-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#reserva-table thead')[0].classList.add('grid-table-head');
  }

  //* Obtenemos la lista de reservaciones
  listaReservaciones() {
    //? Mesero, solo de su propia sucursal, clientes los suyos y admin todos
    let hileraValidadora: string = this.currentUser.user.idPerfil == 2 ? `reservaciones/sucursal/${this.currentUser.user.sucursales[0].id}` :
      this.currentUser.user.idPerfil == 3 ? `reservaciones/usuario/${this.currentUser.user.id}` :
        "reservaciones"; //* Admin
    this.gService
      .list(hileraValidadora)
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

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
    //? console.log(this.currentUser);
  }

  //* Filtro v2 by Marito
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  //* Actualizar Reservacion - Reservación usa id númerico
  actualizarReservacion(id: number) {
    this.router.navigate(['update', id], {
      relativeTo: this.route,
    });
  }
  
  //* Crear Reservación
  crearReservacion() {
    this.router.navigate(['reservaciones/create'], {
      relativeTo: this.route,
    });
  }

  //* Detalle de la reservación
  detalleReservacion(id : number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ReservacionDetailComponent, dialogConfig);
  }

  getCantidadTotalReservaciones() {
    let countReservations: number = 0;
    if (this.datos !== undefined) {
      countReservations = this.datos.map(t => t.id).reduce((partialSum: any, a: any) => partialSum + 1, 0);
    }
    return countReservations;
  }

}
