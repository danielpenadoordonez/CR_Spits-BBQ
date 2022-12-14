import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css'],
})

//* Corresponde al detalle(s) del pedido (comanda)
export class PedidoDetailComponent implements OnInit {
  datos: any; //* Data del pedido
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  estadoPedido: any;
  payWithCreditCard: boolean;
  currentUser: any;
  isAuthenticated: boolean;
  makeSubmit: boolean = false;
  pedidosForm: FormGroup;
  respPedido: any;
  lockStatePicker: boolean = false;
  isPayTypeSelected: boolean = false;
  isAlreadyPaid: boolean = false;
  stateOrder = new FormGroup({
    idEstado: new FormControl<number | null>(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<PedidoDetailComponent>,
    private fb: FormBuilder,
    private notification: NotificacionService,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.datosDialog = data;
    this.formularioReactive();
  }

  ngOnInit(): void {
    if (this.datosDialog.id !== undefined) {
      this.obtenerDetallesByOrderID(this.datosDialog.id);
      this.addStyleClasses();
      this.getEstadoPedido();
      this.getCurrentUser();
      setTimeout(async () => {
        this.stateOrder.get('idEstado').setValue(this.datos.idEstado);
      }, 100);
    }
  }

  formularioReactive() {
    this.pedidosForm = this.fb.group({
      idTipoPago: [null, Validators.required], //* 1 efectivo, 2 tarjeta
      idTipoTarjeta: null, //* Se setea si se cambia
      numeroTarjeta: [
        null,
        Validators.compose([Validators.pattern(/^[0-9]*$/)]),
      ], //* Se setea si se cambia
      monto: [null, Validators.required], //* Solo para v??lidar
      mesTarjeta: [
        null,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ], //* Solo es para evitar submit
      annoTarjeta: [
        null,
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ], //* Solo es para evitar submit
      ccv: [
        null,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(4),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ], //* Solo es para evitar submit
      estado: [null, Validators.required],
      direccion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
          Validators.pattern(/^([a-zA-z0-9????????????????????????????/\\''(),-\s]{2,200})$/),
        ]),
      ],
      idUsuario: [null, Validators.required], //* Viene del current user
    });
  }

  //* Obtenemos al usuario actual logeado, si es que lo hay obvio
  getCurrentUser() {
    //* Subscripci??n a la informaci??n del usuario actual
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    //* Subscripci??n al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
  }

  getEstadoPedido() {
    this.gService
      .list('estado-pedidos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.estadoPedido = data;
        //? console.log(this.perfiles);
      });
  }

  onChangePedidoEstado(estado: any) {
    //* Valida que tenga detalles si cambia a procesada
    if (this.datos.detalles.length == 0 && estado == 3) {
      this.notification.mensaje(
        'Comandas',
        'Por favor, a??ada detalles a la orden antes de procesar',
        TipoMessage.error
      );
      this.lockStatePicker = true;
      return;
    }

    let resp = {
      id: this.datos.id,
      idEstado: estado,
    };

    this.gService
      .update('pedidos/updateState', resp)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.obtenerDetallesByOrderID(this.datosDialog.id);
      });
    this.notification.mensaje(
      'Comandas',
      `Se ha cambiado exitosamente el estado de la comanda ${this.datos.nombre}`,
      TipoMessage.success
    );
  }

  obtenerDetallesByOrderID(id: any) {
    this.gService
      .get('pedidos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  close() {
    this.dialogRef.close();
  }

  addStyleClasses() {
    document
      .querySelector('.mat-dialog-container')
      .classList.add('mandatory-flexbox', 'flexbox');
    document
      .querySelector('.cdk-overlay-pane')
      .classList.add('cdk-overlay-fullscreen');
  }

  //* Cambia si el pedido sera por tarjeta o por efectivo
  changeWayToPay(wayToPay: any) {
    //* se asigna a la factura el tipo de pago de acuerdo a esta variable
    this.pedidosForm.get('idTipoPago').setValue(wayToPay.value ? 2 : 1);
    this.asignarValidaciones(this.pedidosForm.get('idTipoPago').value);
    this.isPayTypeSelected = true;
    this.payWithCreditCard = wayToPay.value;
  }

  asignarValidaciones(idTipoPago: number) {
    if (idTipoPago == 2) {
      this.pedidosForm.controls['idTipoTarjeta'].addValidators(
        Validators.required
      );
      this.pedidosForm.controls['numeroTarjeta'].addValidators(
        Validators.required
      );
      this.pedidosForm.controls['mesTarjeta'].addValidators(
        Validators.required
      );
      this.pedidosForm.controls['annoTarjeta'].addValidators(
        Validators.required
      );
      this.pedidosForm.controls['ccv'].addValidators(Validators.required);
      this.pedidosForm.controls['monto'].removeValidators(Validators.required);
    } else {
      this.pedidosForm.controls['idTipoTarjeta'].removeValidators(
        Validators.required
      );
      this.pedidosForm.controls['numeroTarjeta'].removeValidators(
        Validators.required
      );
      this.pedidosForm.controls['mesTarjeta'].removeValidators(
        Validators.required
      );
      this.pedidosForm.controls['annoTarjeta'].removeValidators(
        Validators.required
      );
      this.pedidosForm.controls['ccv'].removeValidators(Validators.required);
      this.pedidosForm.controls['monto'].addValidators(Validators.required);
    }
  }

  moneyFormat(event: any) {
    //* muestra el total con formato colones y reemplaza letras , es decir no las muestra
    //* OJO: este valor se tiene que convertir en decimal o algo asi y asignar a una variable global
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    value = value.replace(exp, rep);
    value = '???' + value;
    (document.getElementById('efectivoInput') as HTMLInputElement).value =
      value;
  }

  //* Algoritmo para validar si una tarjeta es valida o no
  LuhnCheck(value: any) {
    let sum: number = 0;
    for (var i = 0; i < value.length; i++) {
      var intVal = parseInt(value.substr(i, 1));
      if (i % 2 == 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 == 0;
  }

  //* checa si la tarjeta en los limites de expiraci??n
  expirationCheck(mes, anno): boolean {
    let isValid = false;
    let fecha = new Date();
    let mesNow = fecha.getMonth(); //* obtiene el mes
    let yearNow = fecha.getFullYear() % 100; //* obtiene los ultimos dos digitos del a??o
    if (anno >= yearNow) {
      if (mes > mesNow) {
        isValid = true;
      }
    }
    return isValid;
  }

  inputTarjeta(event: any) {
    let tarjeta = event.target.value;
    tarjeta = tarjeta
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    if (tarjeta.length > 19) {
      tarjeta = tarjeta.substring(0, 19);
    }

    let logoMarca = document.getElementById('logo-marca');
    if (tarjeta.length == 1) {
      if (tarjeta[0] == 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../../assets/images/logos/visa.png';
        imagen.style.width = '75px';
        imagen.setAttribute('data-aos', 'zoom-in');
        logoMarca.appendChild(imagen);
        this.pedidosForm.get('idTipoTarjeta').setValue(1);
      } else if (tarjeta[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../../assets/images/logos/mastercard.png';
        imagen.style.width = '75px';
        imagen.setAttribute('data-aos', 'zoom-in');
        logoMarca.appendChild(imagen);
        this.pedidosForm.get('idTipoTarjeta').setValue(2);
      } else if (tarjeta[0] == 3) {
        logoMarca.innerHTML = '';
        tarjeta = tarjeta.replace(/^3[47][0-9-]{16}$/);
        const imagen = document.createElement('img');
        imagen.src = 'https://img.icons8.com/fluency/75/null/amex.png';
        imagen.style.width = '75px';
        imagen.setAttribute('data-aos', 'zoom-in');
        logoMarca.appendChild(imagen);
        this.pedidosForm.get('idTipoTarjeta').setValue(3);
      }
    }
    (document.getElementById('numeroTarjeta') as HTMLInputElement).value =
      tarjeta;
  }

  inputFecha(event: any, idTextBox: any) {
    let value = event.target.value;
    if (value.length > 2) {
      value = value.substring(0, 2);
    }
    (document.getElementById(idTextBox) as HTMLInputElement).value = value;
  }

  inputCCV(event: any) {
    let value = event.target.value;
    if (value.length > 3) {
      value = value.substring(0, 3);
    }
    (document.getElementById('ccvTarjeta') as HTMLInputElement).value = value;
  }

  mostrarFrente() {
    document.querySelector('#tarjeta').classList.toggle('active');
  }

  //* M??todo cuando presiona el bot??n de pagar
  pagar() {
    //* Validamos
    if (this.datos.detalles.length == 0) {
      this.notification.mensaje(
        'Comandas',
        'Por favor, a??ada detalles a la orden antes de pagar',
        TipoMessage.warning
      );
      return;
    }

    //* Seteamos algo para evitar errores de validaciones
    if (this.payWithCreditCard) {
      this.pedidosForm.patchValue({ monto: undefined });
    }

    //* Seteamos valores p?? - son null, as?? que no deber??an de dar problemas para v??lidar
    this.asignarValidaciones(this.pedidosForm.get('idTipoPago').value);

    //* Validamos el form
    this.pedidosForm.patchValue({
      idUsuario: this.currentUser.user.id,
      estado: true,
    });

    this.makeSubmit = true; //* Subimos p??

    console.log(this.pedidosForm.value);

    if (this.pedidosForm.invalid) {
      this.notification.mensaje(
        'Comandas',
        'Parece que la informaci??n no est?? correcta. <br> Revisa en completar todos campos requeridos',
        TipoMessage.error
      );
      return;
    }

    //* Formato adecuado de nuevo
    if (this.payWithCreditCard) {
      this.pedidosForm.patchValue({ monto: undefined });
    }

    if (this.payWithCreditCard) {
      if (
        !this.expirationCheck(
          this.pedidosForm.get('mesTarjeta').value,
          this.pedidosForm.get('annoTarjeta').value
        )
      ) {
        this.notification.mensaje(
          'Comandas',
          'Por favor, seleccione una fecha de vencimiento v??lida',
          TipoMessage.error
        );
        return;
      }

      if (!this.LuhnCheck(this.pedidosForm.get('numeroTarjeta').value)) {
        this.notification.mensaje(
          'Comandas',
          'El n??mero de tarjeta ingresado, no es v??lido',
          TipoMessage.error
        );
        return;
      }
    } else {
      //? Validamos el monto y eso
      let montoReplace = String(this.pedidosForm.get('monto').value);
      let montoRemplazado = montoReplace.match(/\d/g);
      //* Sin patch para evitar ese problemilla
      if (this.datos.precio > parseFloat(montoRemplazado.join(""))) {
        this.notification.mensaje(
          'Comandas',
          `El monto ingresado debe ser mayor o igual al precio del pedido`,
          TipoMessage.error
        );
        return;
      }
    }
    //* Parseo la data p??
    let dataFormatted = this.parseData(
      this.pedidosForm.value,
      this.datos.detalles
    );

    console.log(dataFormatted)

    //* Env??o la data
    this.gService
      .create('factura/save', dataFormatted)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respPedido = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>??Se ha pagado ??xitosamente el pedido: ${this.datos.nombre} con el n??mero de factura N??${this.respPedido.id}! 
     ha sido <b>creada</b> exitosamente.</p></div>`;
        this.notification.mensaje(
          'Reservaciones',
          notificationBody,
          TipoMessage.success
        );
        this.isAlreadyPaid = true; //* Cambiamos
        //? Rederigimos
        this.router.navigate(['/dashboard/comandas'], {
          queryParams: { update: 'true' },
        });
      });
  }

  public parseData(dataForm: any, dataDetalles: any): any {
    let parseFormat: any = [];
    let detalles: Array<any> = [];
    let tipoPago: any = [];
    dataDetalles.forEach(async (element, index) => {
      detalles[index] = {
        precio: parseInt(element.Producto.precio),
        impuesto: parseInt(element.Producto.precio) * 0.13,
        total_detalle: parseInt(element.Producto.precio) + (parseInt(element.Producto.precio) * 0.13),
        cantidad: parseInt(element.cantidad),
        idProducto: element.idProducto
      };
    });
    let montoReplace = String(this.pedidosForm.get('monto').value);
    let montoRemplazado = montoReplace.match(/\d/g);
    tipoPago = {
      idTipoPago: dataForm.idTipoPago,
      monto: dataForm.idTipoPago == 1 ? parseFloat(montoRemplazado.join("")) : this.datos.precio
    };
    parseFormat = {
      numero_tarjeta: dataForm.idTipoPago == 2 ? dataForm.numeroTarjeta : undefined,
      idTipoTarjeta: dataForm.idTipoPago == 2 ? dataForm.idTipoTarjeta : undefined,
      estado: dataForm.estado,
      direccion: dataForm.direccion,
      idUsuario: dataForm.idUsuario,
      idPedido: this.datos.id,
      detalles: detalles,
      tipoPagos: tipoPago
    };
    return parseFormat;
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.pedidosForm.controls[control].hasError(error) &&
      this.pedidosForm.controls[control].invalid &&
      (this.makeSubmit || this.pedidosForm.controls[control].touched)
    );
  };
}
