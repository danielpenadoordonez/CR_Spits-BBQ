import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})

export class GestionProductoComponent implements AfterViewInit {

  datos: any;
  sucursalesList: any //* Sucursales para filtro
  categoriaList: any //* Lista categorias de productos
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['producto']; //* La categoría es más para ordenarlo que otra cosa 
  currentUser: any; //* Usuario logeado
  isAuthenticated: boolean; //* ¿Está autentificado?

  //* data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  filtros: any = {
    sucursal: -1,
    estado: -1,
    categoria: -1
  }

  constructor(private gService: GenericService, private dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private notification: NotificacionService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.getCurrentUser(); //* Cargamos el usuario
  }

  ngAfterViewInit(): void {
    this.listaSucursales();
    this.listaCategoriasProducto();
    this.listaProductos();
    document.querySelectorAll('#product-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#product-table thead')[0].classList.add('grid-table-head');
  }

  listaProductos() {
    let hileraFiltradora = this.currentUser.user.idPerfil == 2 ? `productos/sucursal/${this.currentUser.user.sucursales[0].id}` : 
    this.currentUser.user.idPerfil == 3 ? "productos/all-hability" : "productos";
    this.gService
      .list(hileraFiltradora)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listarProductosBySucursal(filter: number) {
    this.gService
      .get('productos/sucursal', filter)
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

  listaCategoriasProducto() {
    this.sucursalesList = null;
    this.gService
      .list('categ-prods') //* ruta para llamar esa API, viene del generic service, Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categoriaList = data;
      });
  }

  // FILTROS

  listaProductosToFilter() {
    return this.gService
      .list('productos/all')
      .pipe(takeUntil(this.destroy$));
  }

  filterProductoSucursales(filter: number) {
    this.filtros.sucursal = filter;
  }

  filterProductoEstado(filter: boolean) {
    this.filtros.estado = filter;
  }

  filterProductoCategoria(filter: number) {
    this.filtros.categoria = filter;
  }

  aplicarFiltro() {
    if (this.filtros.sucursal == -1 && this.filtros.estado == -1 && this.filtros.categoria == -1) {
      this.notification.mensaje('Filtro', "No se puede filtrar sin antes haber escogido algún filtro", TipoMessage.warning);
      return;
    }

    this.listaProductosToFilter().subscribe((data: any) => {
      if (this.filtros.sucursal != 0 && this.filtros.sucursal != -1)
        data = data.filter(item => item.sucursales.some(sucursal => sucursal.id == this.filtros.sucursal));

      if (this.filtros.estado != null && this.filtros.estado != -1)
        data = data.filter(item => item.estado == this.filtros.estado);

      if (this.filtros.categoria != 0 && this.filtros.categoria != -1)
        data = data.filter(item => item.idCategoria == this.filtros.categoria);

      this.datos = data
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  actualizarProducto(id: number) {
    this.router.navigate(['update', id], {
      relativeTo: this.route,
    });
  }


  //* Llamada en el front (click)="detalleProducto(item.id) 

  //* Sin problema
  detalleProducto(id: number) { //* Cuidado sino es númerico, OJO
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductoDetailComponent, dialogConfig);
  }

  getCurrentUser() {
    //* Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    //* Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
  }

}
