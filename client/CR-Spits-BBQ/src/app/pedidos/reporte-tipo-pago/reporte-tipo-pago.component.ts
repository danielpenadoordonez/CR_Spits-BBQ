import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
    fechaInicio: new FormControl<Date | null>(null, Validators.required),
    fechaCierre: new FormControl<Date | null>(null, Validators.required),
  });
  //* Control del tipo pago
  typePay = new FormGroup({
    idTipoPago: new FormControl<number | null>(null, Validators.required)
  })

  constructor(private gService: GenericService,
    private notification: NotificacionService
  ) {
    this.loadListaTipoPago(); //* Cargamos la lista
    this.dateRange.get('fechaInicio').setValue(this.filtroFechaInicial);
    this.dateRange.get('fechaCierre').setValue(this.filtroFechaFinal);
    this.typePay.get('idTipoPago').setValue(this.tipoPagoSelected); //* El default pá
  }

  ngOnInit(): void {
    //* Método que llena la vaina 
    this.loadData();
    this.notification.mensaje("Reportes",
      "Se ha cargado la información del reporte",
      TipoMessage.success);
  }

  //* Abrimos el pdf con el botón
  openPDF() {
    //? Configuramos
    //! SE DEBEN RESPETAR LOS NOMBRES EN EL FRONT SÍ O SÍ
    //* htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //* Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //* devuelve un data URI,el cual contiene una representación
      //* de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //* Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //* Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporteTipoPago.pdf');
    });
  }

  loadData(): void {
    this.loadFormatData(); //* Cargamos la variable que va al body
    this.datos = null;
    //* Validamos que todo esté cargado
    if (this.filtroFechaInicial && this.filtroFechaFinal && this.tipoPagoSelected && this.respFormatted) {
      console.log(this.respFormatted);
      //! QUIERE EL TOTAL DE VENTAS, sumar el precio y ya
      this.gService
        .create('reportes/ventas-tipopago', this.respFormatted)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(this.datos);
          //? this.loadArrayFormat(); //* Por último le damos formato a la data antes de enviar al pdf
        });
    }
  }

  loadListaTipoPago(): void {
    this.listaTipoPago = null;
    this.gService
      .list('tipos-de-pago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listaTipoPago = data;
      });
  }

  loadFormatData(): void {
    //! ESTOS NOMBRES ESTÁN PROPENSO A CAMBIO
    this.respFormatted = {
      fechaInicio: `${this.filtroFechaInicial.getFullYear()}-${this.filtroFechaInicial.getMonth() + 1}-${this.filtroFechaInicial.getDate()}`,
      fechaCierre: `${this.filtroFechaFinal.getFullYear()}-${this.filtroFechaFinal.getMonth() + 1}-${this.filtroFechaFinal.getDate()}`,
      idTipoPago: this.tipoPagoSelected //! Cuidado sino va como string
    };
  }

  //* Controlan los cambios...

  changeFechaInicio(data: any): void {
    if (data != null) {
      this.filtroFechaInicial = new Date(String(data));
    } else {
      this.filtroFechaInicial = this.addDays(new Date(), -1); //* Ayer
      this.notification.mensaje("Reportes",
        "Por favor, seleccione una fecha inicio válida",
        TipoMessage.error);
    }
    //* Refrescamos la data
    this.loadData();
  }

  changeFechaFin(data: any): void {
    if (data != null) {
      this.filtroFechaFinal = new Date(String(data));
    } else {
      this.notification.mensaje("Reportes",
        "Por favor, seleccione una fecha fin válida",
        TipoMessage.error);
      this.filtroFechaFinal = new Date(); //* Hoy
    }
    //* Refrescamos la data
    this.loadData();
  }

  changeSelectTipoPago(data: any): void {
    if (data != null && data.value != 0) {
      this.tipoPagoSelected = data.value;
    } else {
      this.notification.mensaje("Reportes",
        "Por favor, seleccione una tipo de pago válido",
        TipoMessage.error);
      this.tipoPagoSelected = 1; //* Default prevent
    }
    //* Refrescamos la data
    this.loadData();
  }

  //* Método que sirve para añadir o quitar días, si se usan negativos
  addDays(date: any, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  //* Damos formato - Sin Uso
  loadArrayFormat() {
    let newArray: Array<object> = [];
    this.datos.forEach(async (element, index, hola) => {
      let fecha = new Date(element.fecha);
      newArray[index] = {
        fecha: `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        cantidadProductos: element.cantidadProductos
      }
    });
    this.datos = newArray; //* Formato Listo :)
    console.log("Formato de la salida");
    console.log(newArray);
  }

  getDescTipoPago(): any {
    let hilera: string = "Efectivo";
    if (this.listaTipoPago) {
      this.listaTipoPago.forEach(async (element) => {
        if (element.id == this.tipoPagoSelected) {
          hilera = element.descripcion;
        }
      });
    }
    return hilera.toLowerCase();
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
