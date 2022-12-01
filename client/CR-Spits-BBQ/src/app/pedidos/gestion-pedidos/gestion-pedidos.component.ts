import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { PedidoDetailComponent } from '../pedido-detail/pedido-detail.component';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})

export class GestionPedidosComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['pedido'];
  currentUser: any; //* Usuario logeado
  isAuthenticated: boolean; //* ¿Está autentificado?
  messageIfEmpty : string;

  //data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor(private gService: GenericService, private dialog: MatDialog, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getCurrentUser(); //* Cargamos el usuario
  }

  ngAfterViewInit(): void {
    this.listaPedidos();
    document.querySelectorAll('#pedido-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#pedido-table thead')[0].classList.add('grid-table-head');
  }

  listaPedidos() {
    let hileraPeticion: string = this.currentUser.user.Perfil.descripcion == "Mesero" ?
      `pedidos/sucursal/${this.currentUser.user.sucursales[0].id}` : this.currentUser.user.idPerfil == 3 ? `pedidos/usuario/${this.currentUser.user.id}`
        : "pedidos";
    this.gService
      .list(hileraPeticion)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.messageIfEmpty = this.datos.length <= 0 && this.currentUser.user.idPerfil == 3 ? "¡Lo sentimos!, pero no tiene pedidos asoaciados a su cuenta" : null;
      });
  }

  //* Llamada en el front (click)="detallePedido(item.id) 

  //! Hay un problemón y es que no hay forma de obtener un detalle(s) de pedido por medio de un id
  detallePedido(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidoDetailComponent, dialogConfig);
  }

  //* Obtenemos al usuario actual logeado, si es que lo hay obvio
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
