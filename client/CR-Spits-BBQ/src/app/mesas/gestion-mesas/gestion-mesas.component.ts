import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource: any;
  displayedColumns = ["codigo", "capacidad", "estado"]; //* Columnas que se verán de las mesas, solo para MatTable

  constructor(private gService: GenericService, private router: Router,
    private route: ActivatedRoute) {

  }

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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarMesa(id: number) {
    this.router.navigate(['/mesas/update', id], {
      relativeTo: this.route,
    });
  }

  crearMesa() {
    this.router.navigate(['/mesas/create'], {
      relativeTo: this.route,
    });
  }

}
