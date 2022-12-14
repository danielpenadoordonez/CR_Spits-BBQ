import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MesaDetailComponent } from '../mesa-detail/mesa-detail.component';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css'],
})
export class GestionMesasComponent implements AfterViewInit, OnInit {
  datos: any; //* Data
  mesaObject: any; //* Objeto mesa
  sucursalesList: any; //* Lista sucursales
  disponibilidadesList; // Lista de disponiilidades

  destroy$: Subject<boolean> = new Subject<boolean>(); //* Suscripción
  displayedColumns = ['mesa']; //* Columnas que se verán de las mesas, solo para MatTable

  filtros: any = {
    sucursal: -1,
    estado: -1,
    disponibilidad: -1,
  };

  //* usuario conectado
  isAuthenticated: boolean;
  currentUser: any;

  //* data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificacionService,
    private changeDetectorRefs: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  ngAfterViewInit(): void {
    document
      .querySelectorAll('#mesas-table tbody')[0]
      .classList.add('grid-table-body');
    document
      .querySelectorAll('#mesas-table thead')[0]
      .classList.add('grid-table-head');
  }

  //* get Current User
  getCurrentUser() {
    //* Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      //* Load data by user information and role
      this.loadMesasData(x);
    });
    //* Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
  }

  loadMesasData(userData: any) {
    userData.user.Perfil.descripcion != 'Mesero'
      ? this.listaMesas()
      : this.listarMesasBySucursal(this.currentUser.user.sucursales[0].id);
    this.listaSucursales();
    this.listaDisponibilidades();
  }

  // Funcion que muestra una notifcacion de acuerdo con los parametros de la URL
  // validateCRUDNotifiaction() {
  //   this.route.queryParams.subscribe(params => {
  //     let isCreated = params['create'] || null;
  //     let isUpdated = params['update'] || null;
  //     let codigo = params['code'] || null;
  //     if (isCreated != null || isUpdated != null && codigo != null) {
  //       this.obtenerMesaByCode(codigo).subscribe((data: any) => {
  //         this.mesaObject = data;
  //         if (this.mesaObject != undefined || this.mesaObject != null) {
  //           if (isCreated) {
  //             this.notification.mensaje('Mesas', `Mesa: ${this.mesaObject.codigo} ha sido creada.`, TipoMessage.success);
  //           } else if (isUpdated) {
  //             this.notification.mensaje('Mesas', `Mesa: ${this.mesaObject.codigo} ha sido actualizada.`, TipoMessage.success);
  //           }
  //         }
  //       });
  //     }
  //   })
  // }

  obtenerMesaByCode(code: any): any {
    return this.gService
      .get('mesas/codigo', code)
      .pipe(takeUntil(this.destroy$));
  }

  // Redirige a actualizar mesa
  actualizarMesa(id: number) {
    this.router.navigate(['update', id], {
      relativeTo: this.route,
    });
  }

  listaMesas() {
    this.gService
      .list('mesas/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listaMesasToFilter() {
    if (this.currentUser.user.Perfil.descripcion != 'Mesero') {
      return this.gService.list('mesas/all').pipe(takeUntil(this.destroy$));
    } else {
      return this.gService
        .get('mesas/sucursal', this.currentUser.user.sucursales[0].id)
        .pipe(takeUntil(this.destroy$));
    }
  }

  listarMesasBySucursal(filter: number) {
    this.gService
      .get('mesas/sucursal', filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listaSucursales() {
    this.sucursalesList = null;
    this.gService
      .list('sucursales') //* ruta para llamar esa API, viene del generic service, Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  listaDisponibilidades() {
    this.sucursalesList = null;
    this.gService
      .list('disponibilidades') //* ruta para llamar esa API, viene del generic service, Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.disponibilidadesList = data;
      });
  }

  filterMesasSucursales(filter: number) {
    this.filtros.sucursal = filter;
  }

  filterMesasEstado(filter: boolean) {
    this.filtros.estado = filter;
  }

  filterMesasDisponibilidad(filter: number) {
    this.filtros.disponibilidad = filter;
  }

  aplicarFiltro() {
    if (
      this.filtros.sucursal == -1 &&
      this.filtros.estado == -1 &&
      this.filtros.disponibilidad == -1
    ) {
      this.notification.mensaje(
        'Filtro',
        'No se puede filtrar sin antes haber escogido algún filtro',
        TipoMessage.warning
      );
      return;
    }

    this.listaMesasToFilter().subscribe((data: any) => {
      if (this.filtros.sucursal != 0 && this.filtros.sucursal != -1)
        data = data.filter((item) => item.idSucursal == this.filtros.sucursal);

      if (this.filtros.estado != null && this.filtros.estado != -1)
        data = data.filter((item) => item.estado == this.filtros.estado);

      if (this.filtros.disponibilidad != 0 && this.filtros.disponibilidad != -1)
        data = data.filter(
          (item) => item.idDisponibilidad == this.filtros.disponibilidad
        );

      this.datos = data;
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  detalleOrdenAction(mesa: any) {
    let ultimoPedido = 0; //* último pedido de dicha mesa
    if (mesa.pedidos.length > 0) {
      ultimoPedido = mesa.pedidos[mesa.pedidos.length - 1].id;
    }
    //* console.log(ultimoPedido);
    if (ultimoPedido != 0) {
      this.router.navigate(['pedidos/update', ''], {
        queryParams: { idPedido: ultimoPedido, codigoMesa: mesa.codigo },
        relativeTo: this.route,
      });
    }else{
      this.router.navigate(['pedidos/update', ""], {
        queryParams: { codigoMesa: mesa.codigo },
        relativeTo: this.route,
      });
    }
  }

  pedidoMesaAction(idMesa: number) {
    this.gService
      .get('mesas', idMesa)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (
          data.EstadoMesa.descripcion == 'Disponible' ||
          data.EstadoMesa.descripcion == 'Reservada'
        ) {
          this.router.navigate(['pedidos/create'], {
            queryParams: { idMesa: data.id, codigoMesa: data.codigo },
            relativeTo: this.route,
          });
        }
      });
  }

  reservarMesaAction(idMesa: number) {
    this.gService
      .get('mesas', idMesa)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.EstadoMesa.descripcion == 'Disponible') {
          this.router.navigate(['reservaciones/create'], {
            queryParams: { codigoMesa: data.codigo },
            relativeTo: this.route,
          });
        }
      });
  }
}
