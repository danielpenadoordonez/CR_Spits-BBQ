import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-all',
  templateUrl: './productos-all.component.html',
  styleUrls: ['./productos-all.component.css']
})
export class ProductosAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(); //* Establecemos la fuente del matTable

  //* Columnas a mostrar de producto - Se pueden añadir más
  displayedColumns = ['id', 'nombre', 'Categoria_Producto', 'estado', 'precio', 'acciones'];
  //* Acciones son los botones...
  //? estado es un boolean que indica si está habilitado (true) o no

  constructor(private router: Router,
    private route: ActivatedRoute, private gService: GenericService) {
  }

  ngAfterViewInit(): void {
    this.listaProductos();
  }

  //* Obtenemos la lista de productos
  listaProductos() {
    this.gService
      .list('productos/')
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

  //* Filtro by Marito
  aplicarFiltro(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //* Ahora sí se usa el id númerico
  actualizarProducto(id: number) {
    this.router.navigate(['/productos/update', id], {
      relativeTo: this.route,
    });
  }

  crearProducto() {
    this.router.navigate(['/productos/create'], {
      relativeTo: this.route,
    });
  }

}
