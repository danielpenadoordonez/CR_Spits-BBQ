import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { GestionUsuariosDataSource, GestionUsuariosItem } from './gestion-usuarios-datasource';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./../../productos/gestion-producto/gestion-producto.component.css','./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements AfterViewInit {
  //* De momento su función será brindar una lista de usuarios para que pueda visualizar el administrador...
  datos: any;
  sucursalesList: any //* Sucursales para filtro
  categoriaList: any //* Lista categorias de productos
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any; //* Usuario logeado
  isAuthenticated: boolean; //* ¿Está autentificado?
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GestionUsuariosItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['user'];

  constructor(private gService: GenericService) {}

  ngOnInit() {
    this.listarUsers(); 
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('#user-table tbody')[0].classList.add('grid-table-body');
    document.querySelectorAll('#user-table thead')[0].classList.add('grid-table-head');
  }

  listarUsers() {
    this.gService
      .list('users')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
}
