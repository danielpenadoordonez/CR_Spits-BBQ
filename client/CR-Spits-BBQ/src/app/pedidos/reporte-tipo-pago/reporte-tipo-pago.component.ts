import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-reporte-tipo-pago',
  templateUrl: './reporte-tipo-pago.component.html',
  styleUrls: ['./reporte-tipo-pago.component.css']
})
export class ReporteTipoPagoComponent implements OnInit {
  datos: any; //* Data para llenar el reporte
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  listaTipoPago: any;  //* Lista con los tipos de pago
  //? Valores default asegurados
  tipoPagoSelected: number = 1; //* Tipo de pago seleccionado con default
  filtroFechaInicial: Date = this.addDays(new Date(), -1); //* Ayer
  filtroFechaFinal: Date = new Date(); //* Hoy
  respFormatted: any = null; //* Corresponde al body del API
  //* Control de las fechas
  dateRange = new FormGroup({
    fechaInicio: new FormControl<Date | null>(null),
    fechaCierre: new FormControl<Date | null>(null),
  });
  //* Control del tipo pago
  typePay = new FormGroup({
    idTipoPago: new FormControl<number | null>(null)
  })

  constructor(private gService: GenericService,
    private notification: NotificacionService
  ) {
    this.loadListaTipoPago(); //* Cargamos la lista
  }

  ngOnInit(): void {
    //* Método que llena la vaina 
    this.loadData();
    this.notification.mensaje("Reportes",
      "Se ha cargado la información del reporte",
      TipoMessage.success);
  }

  loadData(): void {
    this.loadFormatData(); //* Cargamos la variable que va al body
    this.datos = null;
    //* Validamos que todo esté cargado
    if (this.filtroFechaInicial && this.filtroFechaFinal && this.tipoPagoSelected && this.respFormatted) {
      console.log("body format send")
      console.log(this.respFormatted);
      //! ESTO PUEDE CAMBIAR
      this.gService
        .create('reportes/ventas-fecha', this.respFormatted)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(this.datos)
        });
    }
  }

  loadListaTipoPago(): void {
    this.listaTipoPago = null;
    this.gService
      .list('tipos-de-pago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  loadFormatData(): void {
    //! ESTOS NOMBRES ESTÁN PROPENSO A CAMBIO
    this.respFormatted = {
      fechaInicio: `${this.filtroFechaInicial.getFullYear()}-${this.filtroFechaInicial.getMonth() + 1}-${this.filtroFechaInicial.getDate()}`,
      fechaCierre: `${this.filtroFechaFinal.getFullYear()}-${this.filtroFechaFinal.getMonth() + 1}-${this.filtroFechaFinal.getDate()}`,
      idTipoPago: this.tipoPagoSelected //* Cuidado sino va como string
    };
  }

  //* Controlan los cambios...

  changeFechaInicio(data: any): void {
    if (data != null) {
      this.filtroFechaInicial = new Date(String(data));
    } else {
      this.filtroFechaInicial = this.addDays(new Date(), -1); //* Ayer
    }
    //* Refrescamos la data
    this.loadData();
  }

  changeFechaFin(data: any): void {
    if (data != null) {
      this.filtroFechaFinal = new Date(String(data));
    } else {
      this.filtroFechaFinal = new Date(); //* Hoy
    }
    this.loadData();
  }

  changeSelectTipoPago(data: any): void {
    console.log("data tipo pago");
    console.log(data);
    if (data != null || data == 0) {
      this.tipoPagoSelected = data;
    } else {
      this.tipoPagoSelected = 1; //* Default prevent
    }
    this.loadData();
  }

  //* Método que sirve para añadir o quitar días, si se usan negativos
  addDays(date: any, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  //* Borramos
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //* Manejo de errores - dates
  public errorHandlingDate = (control: string, error: string) => {
    return (
      this.dateRange.controls[control].hasError(error) &&
      this.dateRange.controls[control].invalid &&
      (this.makeSubmit || this.dateRange.controls[control].touched)
    );
  };

  //* Manejo de errores - tipos de pago
  public errorHandlingTypePay = (control: string, error: string) => {
    return (
      this.typePay.controls[control].hasError(error) &&
      this.typePay.controls[control].invalid &&
      (this.makeSubmit || this.typePay.controls[control].touched)
    );
  };

}
