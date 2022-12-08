import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})

//* Corresponde al detalle(s) del pedido (comanda)
export class PedidoDetailComponent implements OnInit {
  datos: any; //* Data
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  estadoPedido: any;
  payWithCreditCard: boolean;
  currentUser: any;
  isAuthenticated: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<PedidoDetailComponent>,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id !== undefined) {
      this.obtenerDetallesByOrderID(this.datosDialog.id);
      this.addStyleClasses();
      this.getEstadoPedido();
      this.getCurrentUser();
    }
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

  getEstadoPedido() {
    this.gService
      .list('estado-pedidos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.estadoPedido = data;
        //? console.log(this.perfiles);
      });
  }

  onChangePedidoEstado(estado: any){


  }


  obtenerDetallesByOrderID(id: any) {
    this.gService
      .get('pedidos/', id)
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
    document.querySelector('.mat-dialog-container').classList.add('mandatory-flexbox', 'flexbox');
    document.querySelector('.cdk-overlay-pane').classList.add('cdk-overlay-fullscreen');
  }

  // Cambia si el pedido sera por tarjeta o por efectivo
  changeWayToPay(wayToPay: boolean){
    // se asigna a la factura el tipo de pago de acuerdo a esta variable
    this.payWithCreditCard = wayToPay;
  }

  moneyFormat(event: any){
    // muestra el total con formato colones y reemplaza letras , es decir no las muestra
    // OJO: este valor se tiene que convertir en decimal o algo asi y asignar a una variable global
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = "₡" + value;
    (document.getElementById('efectivoInput') as HTMLInputElement).value = value;
  }

  // Algoritmo para validar si una tarjeta es valida o no
  LuhnCheck(value: any) {
    var sum = 0;
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
    return (sum % 10) == 0;
  }


  // checa si la tarjeta en los limites de expiración
  expirationCheck(mes, anno): boolean {
    let isValid = false;
    let fecha = new Date();
    let mesNow = fecha.getMonth(); // obtiene el mes
    let yearNow = fecha.getFullYear() % 100; // obtiene los ultimos dos digitos del año
    if (anno >= yearNow) {
      if (mes == mesNow) {
        isValid = true;
      }
    }
    return isValid;
  }



  inputTarjeta(event: any) {
    let tarjeta = event.target.value;
    tarjeta = tarjeta.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    if (tarjeta.length > 19) {
      tarjeta = tarjeta.substring(0, 19)
    }
    let logoMarca = document.getElementById('logo-marca');
    if (tarjeta.length == 1) {
      if (tarjeta[0] == 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../../assets/images/logos/visa.png';
        imagen.style.width = '75px'
        imagen.setAttribute('data-aos', 'zoom-in')
        logoMarca.appendChild(imagen);
      } else if (tarjeta[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../../assets/images/logos/mastercard.png';
        imagen.style.width = '75px'
        imagen.setAttribute('data-aos', 'zoom-in')
        logoMarca.appendChild(imagen);
      } else if (tarjeta[0] == 3) {
        logoMarca.innerHTML = '';
        tarjeta = tarjeta.replace(/^3[47][0-9-]{16}$/);
        const imagen = document.createElement('img');
        imagen.src = 'https://img.icons8.com/fluency/75/null/amex.png';
        imagen.style.width = '75px';
        imagen.setAttribute('data-aos', 'zoom-in')
        logoMarca.appendChild(imagen);
      }
    }
    (document.getElementById('numeroTarjeta') as HTMLInputElement).value = tarjeta;
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
  
}
