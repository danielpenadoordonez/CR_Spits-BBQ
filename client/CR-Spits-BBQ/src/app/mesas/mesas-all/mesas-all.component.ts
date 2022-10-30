import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mesas-all',
  templateUrl: './mesas-all.component.html',
  styleUrls: ['./mesas-all.component.css']
})

export class MesasAllComponent implements AfterViewInit {
  datos: any; //* Data
  destroy$: Subject<boolean> = new Subject<boolean>(); //* Suscripción
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //* Cambiamos la fuente de datos
  dataSource = new MatTableDataSource<any>();

  //* Columnas que se mostrarán en el front end
  displayedColumns = ['codigo', 'capacidad', 'EstadoMesa', 'acciones'];
  //* Acciones son los botones...
  //* Sucursales y disponibilidad van en el form

  constructor(private router: Router,
    private route: ActivatedRoute, private gService: GenericService) {
  }

  ngAfterViewInit(): void {

    this.listaMesas();
  }

  listaMesas() {
    this.gService
      .list('mesas/') //* Capturamos el API all
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data; //* Asignamos la data a nuestra variable
        this.dataSource = new MatTableDataSource(this.datos); //* Igual la fuente de datos
        this.dataSource.sort = this.sort; //* Ordenar
        this.dataSource.paginator = this.paginator; //* Paginar
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //* Filtro by Marito
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //* Actualizar una mesa por su código [String], no id [int], en dado caso cambiar a STRING el parámetro
  actualizarMesa(id: string) {
    this.router.navigate(['/mesas/update', id], {
      relativeTo: this.route,
    });
  }

  //* Crear mesa
  crearMesa() {
    this.router.navigate(['/mesas/create'], {
      relativeTo: this.route,
    });
  }

}
