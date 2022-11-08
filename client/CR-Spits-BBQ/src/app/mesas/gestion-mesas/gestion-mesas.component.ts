import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MesaDetailComponent } from '../mesa-detail/mesa-detail.component';
import * as AOS from 'aos'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css'],
})

export class GestionMesasComponent implements AfterViewInit, OnInit {
  datos: any; //* Data
  mesaObject: any; //* Objeto mesa
  sucursalesList: any; //* Lista sucursales
  destroy$: Subject<boolean> = new Subject<boolean>(); //* Suscripción
  displayedColumns = ['mesa']//* Columnas que se verán de las mesas, solo para MatTable

  //data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor(private gService: GenericService, private dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private notification: NotificacionService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.listaSucursales();
    this.filterMesasSucursales(0);
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('#mesas-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#mesas-table thead')[0].classList.add('grid-table-head');
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
      .list('mesas/all-hability')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listarMesasBySucursal(filter: number){
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

  filterMesasSucursales(filter: number) {
    if (filter <= 0) {
      this.listaMesas();
    }
    else {
      this.listarMesasBySucursal(filter);
    }
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