import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Chart from 'chart.js/auto';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-reporte-fechas',
  templateUrl: './reporte-fechas.component.html',
  styleUrls: ['./reporte-fechas.component.css']
})
export class ReporteFechasComponent implements AfterViewInit {
  //* Reporte por gráfico de tipo pie Chart.js
  //* Documentación https://www.chartjs.org/docs/latest/charts/doughnut.html#pie
  //* Instalación de chart.js: npm install chart.js --save

  //* Canvas para el grafico
  canvas: any;
  //* Contexto del Canvas
  ctx: any;
  //* Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //* Establecer gráfico
  grafico: any;
  //* Datos para mostrar en el gráfico
  datos: any;
  //* Lista de meses para filtrar el gráfico
  mesList: any;
  //* Fecha actual
  filtroFechaInicial = new Date("2022-11-05");
  //* 1 día después por default
  filtroFechaFinal = this.addDays(this.filtroFechaInicial, 30);
  filtroFormatted: any = null; //* Sirve para darle formato a la entrada
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService,
    private notification: NotificacionService
  ) { }


  ngAfterViewInit(): void {
    this.inicioGrafico(this.filtroFechaInicial, this.filtroFechaFinal);
  }

  inicioGrafico(fecha1: any, fecha2: any): void {
    this.filtroFechaInicial = fecha1;
    this.filtroFechaFinal = fecha2;
    this.loadDateFormat();
    if (this.filtroFechaInicial && this.filtroFechaFinal && this.filtroFormatted) {
      //* Obtenemos la información del API
      //? Es necesario que vaya con formato
      //? console.log(JSON.stringify(this.filtroFormatted))
      this.gService
        .create('reportes/ventas-fecha', this.filtroFormatted)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(this.datos)
          this.loadArrayFormat();
        });
    }
  }

  //* Configurar y crear gráfico
  graficoBrowser(): void {
    console.log(this.datos)
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //* Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {

      type: 'pie',
      data: {
        //* Etiquetas del grafico, debe ser un array
        labels: this.datos.map(x => x.fecha),
        //* Isaac puede cambiar los colores a gusto...
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              '#3498db',
              '#95a5a6',
              '#9b59b6',
              '#f1c40f',
              '#e74c3c',
            ],
            //* Datos del grafico, debe ser un array
            data: this.datos.map(x => x.cantidadProductos),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }

  loadDateFormat(): void {
    //* Solamente se encarga de darle formato para enviarlo
    this.filtroFormatted = {
      fechaInicio: `${this.filtroFechaInicial.getFullYear()}-${this.filtroFechaInicial.getMonth() + 1}-${this.filtroFechaInicial.getDate()}`,
      fechaCierre: `${this.filtroFechaFinal.getFullYear()}-${this.filtroFechaFinal.getMonth() + 1}-${this.filtroFechaFinal.getDate()}`
    };
    console.log(this.filtroFechaFinal);
    //? console.log(JSON.stringify(this.filtroFormatted));
  }

  loadArrayFormat() {
    let newArray: Array<object> = [];
    this.datos.forEach(async (element, index, hola) => {
      let fecha = new Date(element.fecha);
      newArray[index] = {fecha: `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
      cantidadProductos: element.cantidadProductos}
    });

    this.datos = newArray; //* Seteamos 
    this.graficoBrowser();
  }

  changeFechaIncio(data : any){

  }

  changeFechaFin(data : any){

  }

  //* Sirve para añadir o quitar días según se necesite
  addDays(date: any, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  //* Borramos
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
