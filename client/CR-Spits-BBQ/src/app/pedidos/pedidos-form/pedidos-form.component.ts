import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
})
export class PedidosFormComponent {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  clientsList: any; //* Lista de clientes
  sucursalesList: any; //* lista de sucursales
  statesList: any; //* Lista de estados de pedido
  typeOrder: any; //* Lista tipos de órdenes (presencial & online)
  pedidoInfo: any; //? información del producto a actualizar [UPDATE]
  respPedido: any; //* Respuesta del API ante [UPDATE - CREATE]
  submitted = false; //? Se envío?
  pedidosForm: FormGroup; //* El nombre del formulario [CUIDADO]
  idPedido: number = 0; //* id del pedido [int]
  isCreate: boolean = true; //* si es update o create

  CurrentUser = null; //* Obtener de la suscripción

  /*
  * FORMATO JSON - PEDIDO
! CUIDADO CON LA FECHA Y SU FORMATO, SINO ENVIAR POR DEFAULT (HOY)
        * "id" : 1 (autoincrement)
        * "nombre": "CRSB-01-12",
        * "precio": 15000,
        * "fecha": "2022-11-22", -- Puede usar default
        * "idEstado": 6, -- estados
        * "idCliente": "65440685802",
        * "idMesero": "463650893", -- Viene del servicio de autentificación
        * "idSucursal": 1,
        * "idMesa": 3, -- Lista de mesas?
        * "idTipoPedido": 1,
        * "detalles":
          ? [] -- CUIDADO
  */

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificacionService
  ) {
    this.formularioReactive();
    this.listaClientes();
    this.listaSucursales();
    //! this.listaOrderStates(); - Arreglar luego
    //! this.listaTiposOrden(); -- Arreglar luego
  }

  //? Update del pedido - recordar bloquear el filtro de sucursal si es mesero
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idPedido = params['id']; //? Recibe el id [int]
      if (this.idPedido !== undefined) {
        this.isCreate = false; //* No... es actualizar
        this.titleForm = 'Actualizar';
        this.gService
          .get('pedidos', this.idPedido) //? Trae por medio del id númerico [int]
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.pedidoInfo = data;
            this.pedidosForm.setValue({
              id: this.pedidoInfo.id,
              nombre: this.pedidoInfo.nombre,
              estado: this.pedidoInfo.estado,
              fecha: this.pedidoInfo.fecha,
              idEstado: this.pedidoInfo.idEstado,
              idCliente: this.pedidoInfo.idCliente,
              idMesero: this.pedidoInfo.idMesero,
              idSucursal: this.pedidoInfo.idSucursal,
              idMesa: this.pedidoInfo.idMesa,
              idTipoPedido: this.pedidoInfo.idTipoPedido,
              detalles: null, //* No se mapea
            });
          });
      } else {
        //! CASO DE QUE ENTRE ADMIN O QUE ENTRE MESERO
        //! Puede elegir fecha, cliente (ambos), tipo de pedido, estado del pedido (mesero va por default)
      }
    });
  }

  //! Nombre del pedido se generá en el back, hacen falta los estados, perfiles, autentificación

  formularioReactive() {
    //? [null, Validators.required]
    this.pedidosForm = this.fb.group({
      id: null, //* No se puede editar - autoincrement
      nombre: null, //* Viene del backend automático
      precio: null, //* Este campo se autocácula con base en los detalles - se envía nulo - [DEFAULT]
      fecha: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/), //? Formato fecha MM/dd/yyyy
        ]), //* [DEFAULT]
      ],
      idEstado: [null, Validators.required], //* Se elige el primer estado 1 - [DEFAULT]
      idCliente: [null, Validators.required], //? Se elige de un combo box - A no ser que sea cliente
      idMesero: null, //? Se asigna por el servicio
      idSucursal: null, //? Se asigna por la sucursal a la que esté asignada la mesa elegida o bien por el mesero
      idMesa: null, //? Se elige en el inicio - [OPCIONAL - ONLINE]
      idTipoPedido: [null, Validators.required], //* Se auto hace, si es un cliente es online, sino es presencial - [DEFAULT PRESENCIAL]
      detalles: null //* No va acá
    });
  }

  //* Elegir al cliente? [unique]
  listaClientes() {
    this.clientsList = null;
    this.gService
      .list('users/perfil/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientsList = data;
      });
  }

  //* Seleccionar una sucursal [unique - cuidado con la condición de mesero]
  listaSucursales() {
    this.sucursalesList = null;
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  //! AÚN NO EXISTE UN API QUE LLAME ESTO
  listaOrderStates() {
    this.statesList = null;
    this.gService
      .list('estados')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.statesList = data;
      });
  }

  listaTiposOrden() {
    this.statesList = null;
    this.gService
      .list('tipos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.statesList = data;
      });
  }

  //* Manejo de errores - público
  public errorHandling = (control: string, error: string) => {
    return this.pedidosForm.controls[control].hasError(error);
  };

  crearPedido() {


  }

  actualizarPedido() {


  }

  onReset() {
    //* Resetear
    this.submitted = false;
    this.pedidosForm.reset();
  }

  onBack() {
    //* Cuando intenté salir - botón salir
    this.router.navigate(['/dashboard/productos']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }

  //? Filtro de fecha - que no sea menor y que no se pase de 1 semana
  dateFilter = (d: Date | null): boolean => {
    const datePicked = d || new Date();
    let dateToday = new Date();

    return (
      datePicked.getDate() >= dateToday.getDate() - 1 &&
      datePicked.getDate() < dateToday.getDate() + 7 &&
      datePicked.getMonth() == dateToday.getMonth()
    );
  };
}
