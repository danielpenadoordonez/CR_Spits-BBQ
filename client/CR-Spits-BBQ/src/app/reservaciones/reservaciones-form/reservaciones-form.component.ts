import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
//import * as moment from 'moment';

@Component({
  selector: 'app-reservaciones-form',
  templateUrl: './reservaciones-form.component.html',
  styleUrls: ['./../../pedidos/pedidos-form/pedidos-form.component.css',
              './../../mesas/gestion-mesas/gestion-mesas.component.css',
              './reservaciones-form.component.css']
})
export class ReservacionesFormComponent {

  titleForm: string = 'Crear'; //* Título del form
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false; //* Indica si se subió o no
  clientsList: any; //* en caso de que sea un admin o mesero el que lo cree para que seleccione...
  clienteSeleccionado: any; // cliente seleccionado el list
  sucursalesList: any; //* Es solo para terminos de mostrar en el update
  mesaSelected: any; //* Corresponde a la mesa con toda su data, proviene del id o código respectivamente
  isMesaLoaded: boolean = false; //* Indica si se cargó o no la mesa...
  cantidad: number = 1; //* Corresponde a la cantidad de personas que soporta la mesa
  reservationInfo: any; //? información de la reservación
  respReservation: any; //* Respuesta del API ante [UPDATE - CREATE]
  submitted = false; //? Se envío?
  formReservations: FormGroup; //* El nombre del formulario [CUIDADO]
  idReservacion: number = 0; //* id de la reservación [int]
  isCreate: boolean = true; //* si es update o create
  currentUser: any; //* Corresponde al usuario que esta usando esto
  isAuthenticated: boolean = false; //* Es para saber si está o no autentificado

  //* Configuración del datetime picker
  @ViewChild('picker') picker: any; //* Controla el timepicker
  showSpinners = true;
  minDate: object = null;
  maxDate: object = null;
  //* Saltos en el spinner
  stepHour = 1;
  stepMinute = 5;
  stepSecond = 1;
  color: ThemePalette = 'warn'; //* Temas: primary, accent y warn 

  inputFiltro = new FormControl('');
  filteredOptions: Observable<any[]>;

  mesa: any; // mesa obtenida del route params
  //TODO CONSIDERACIONES:
  //? Cliente se podría obtener por el currentuser o bien en el mat-select 
  //? El código de mesa por params al igual, luego con un api se busca y saco id y sucursal 
  //? Mesero y admin sí pueden editar la cantidad, la fecha, usuario y quizás cancelarla
  //? El codigo se auto genera en el backend, por lo que no será necesario, solo para mostrarlo en el update
  /* 
  * FORMATO JSON - RESERVACIÓN
       * "fecha_hora" : "2022-12-1", -- Se elige, editable
       * "cantidad": 5, -- Se elige con base en la mesa..., editable
       * "idSucursal": 1,
       * "idUsuario": "167459042",
       * "idMesa" : 1   
  */

  constructor(private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private notification: NotificacionService) {
    this.formularioReactive();
    this.listaSucursales();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let codigoMesa = params['codigoMesa'] || null;
      if (codigoMesa != null) { //* Es create
        this.isCreate = true; //* Por si acaso
        console.log("es crear");
        this.loadMesaByCodigo(codigoMesa);
      } else { //* Update
        console.log("es actualizar");
        //? Para actualizar es necesario el params id uno con idReservacion y luego ya con el api lo sacamos...
        this.loadDataReservation(); //* Si no es update
      }
      this.getMesaDetail();
    });

    //* Cargamos el usuario al inicio
    this.getCurrentUser();
    //* Cargamos las fechas
    this.setMaxAndMinDates();
  }

  // filtro para el mat autocomplete de clientes
  private _filter(value: any): any[] {
    console.log(value);
    const filterValue = value;

    return this.clientsList.filter(clients => clients.nombre.toLowerCase().includes(filterValue)
      || clients.apellido1.toLowerCase().includes(filterValue)
      || clients.apellido2.toLowerCase().includes(filterValue));
  }

  //* Configuramos el formulario
  formularioReactive(): void {
    this.formReservations = this.fb.group({
      id: null, //* Ya que no es editable, readonly... viene de autoincrement...
      codigo: null, //* Igualmente es un readonly, se genera en el backend...
      fecha_hora: [null, Validators.compose([
        Validators.required, Validators.minLength(12), Validators.maxLength(15)
      ])], //? Es editable y se selecciona por el filtro
      cantidad: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.pattern(/^[0-9]{1,2}$/) //* El max se hace una vez que se obtiene la mesa
      ])], //? Es editable
      idSucursal: null, //* No es editable, viene de la mesa
      idUsuario: null, //? Depende puede que sí [cliente], se maneja fuera
      idMesa: null //* No es editable, pensaba que se podía hacer un diseño todo wapo, colocando la mesa como en gestión cuando se le da o sea al ladito
    });
  }

  //* Limpiamos
  onReset() {
    this.submitted = false;
    this.formReservations.reset();
  }

  onBack() {
    //* Cuando intenté salir - botón salir
    this.router.navigate(['/dashboard/reservaciones']);
  }

  //* Cargamos la lista de clientes
  //* Elegir al cliente? [unique]
  listaClientes() {
    this.clientsList = null;
    this.gService
      .list('users/perfil/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientsList = data;
        this.filteredOptions = this.inputFiltro.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      });
  }

  // obtiene el detalle de la mesa
  getMesaDetail() {
    this.route.queryParams.subscribe(params => {
      let idMesa = params['idMesa'] || null;
      let codigoMesa = params['codigoMesa'] || null;
      if (idMesa != null) {
        this.gService
          .get('mesas', idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.mesa = data;
          });
      }
      if (codigoMesa != null) {
        this.gService
          .get('mesas/codigo', codigoMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.mesa = data;
          });
      }
    })
  }

  //* Cargamos la lista de sucursales
  listaSucursales() {
    this.sucursalesList = null; //* Reset
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
        //? console.log(this.clientsList);
      });
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (this.currentUser.user.Perfil.descripcion == 'Cliente') {
        this.clienteSeleccionado = x.user;
      }
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );

    if (this.isAuthenticated) {
      if (this.currentUser.user.idPerfil != 3) {
        this.listaClientes(); //* Si es create y sea admin o mesero, sino se cae xd
        this.formReservations.get('idUsuario').setValidators(Validators.required); //* Lo volvemos requerido
      }
    }

  }

  //* Carga la data de la mesa por el código [create]
  loadMesaByCodigo(codigoMesa: string): void {
    this.mesaSelected = null; //* Reset
    this.gService
      .get('mesas/codigo', codigoMesa)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.mesaSelected = data;
        this.isMesaLoaded = true;
        this.mesa = data;
        //? console.log(this.mesaSelected)
      });
  }

  //* Carga la data de la mesa por el id [Update]
  loadMesaById(idMesa: number): void {
    this.mesaSelected = null; //* Reset
    this.gService
      .get('mesas', idMesa)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.mesaSelected = data;
        this.isMesaLoaded = true;
        console.log("Mesa por id:");
        console.log(this.mesaSelected);
      });
  }

  //* Cargar datos en caso de que sea update...
  loadDataReservation() {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idReservacion = params['id']; //? Recibe el id de la reservación [int], OJO no es lo mismo que el de código mesareservationInfo
      if (this.idReservacion !== undefined) {
        this.isCreate = false; //* Update
        this.titleForm = 'Actualizar'; //* Cambiamos título
        this.gService.get('reservaciones', this.idReservacion) //? Trae la reservación por medio del id númerico [int]
          .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            this.reservationInfo = data; //* Obtenemos la data y la asignamos
            this.loadMesaById(this.reservationInfo.idMesa); //* Cargamos por id
            //? SOLO USO EL SET SI MAPEO ABSOLUTAMENTE TODO
            this.formReservations.setValue({
              id: this.reservationInfo.id,
              codigo: this.reservationInfo.codigo,
              fecha_hora: this.reservationInfo.fecha_hora,
              cantidad: this.reservationInfo.cantidad,
              idSucursal: this.reservationInfo.Sucursal.nombre,
              idUsuario: this.reservationInfo.idUsuario,
              idMesa: this.reservationInfo.idMesa
            });
            this.mesa = data.Mesa;
            this.loadMesaByCodigo(data.Mesa.codigo)
          });
      }
    })
  }

  //* Crear una reservación
  crearReservacion(): void {
    //* Establecemos submit verdadero 
    this.submitted = true;

    //* Verificar validación del form
    if (this.formReservations.invalid) {
      this.notification.mensaje("Reservaciones",
        "Parece que la información no está correcta. <br> Revisa en completar todos campos requeridos",
        TipoMessage.error);
      return;
    }

    //TODO Revisamos la data
    console.log(this.formReservations.value);

    //* Validamos horas
    let fechaSeleccionada = new Date(this.formReservations.get("fecha_hora").value);
    let fechaAhora = new Date();

    //* Validación de fechas
    if (fechaSeleccionada.getTime() < fechaAhora.getTime()) {
      this.notification.mensaje("Reservaciones",
        "La hora ingresada no es <b>válida</b>.",
        TipoMessage.error);
      return;
    }

    if (fechaSeleccionada.getMinutes() < (fechaAhora.getMinutes() + 30)) {
      this.notification.mensaje("Reservaciones",
        "La hora ingresada debe ser </b>al menos 30m</b> después de la hora actual.",
        TipoMessage.error);
      return;
    }

    //* Asignamos lo que falta
    //? La sucursal, mesa o en caso de ser cliente su id...
    if (this.currentUser.user.idPerfil == 3) { //* Cliente
      this.formReservations.patchValue({ idUsuario: this.currentUser.user.id });
    }

    this.formReservations.patchValue({ idSucursal: this.mesaSelected.idSucursal, idMesa: this.mesaSelected.id });

    //* Accion API create enviando toda la informacion del formulario
    this.gService.create('reservaciones', this.formReservations.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respReservation = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>Reservación número: ${this.respReservation.id} <br> ${this.respReservation.codigo} 
       ha sido <b>creada</b> exitosamente.</p></div>`
        this.notification.mensaje('Reservaciones', notificationBody, TipoMessage.success);
        //? Rederigimos
        this.router.navigate(['/dashboard/reservaciones'], {
          queryParams: { create: 'true' }
        });
      });
  }

  //* Actualizar una reservación
  actualizarReservacion(): void {
    //* Establecemos submit verdadero 
    this.submitted = true;

    //* Verificar validación del form
    if (this.formReservations.invalid) {
      this.notification.mensaje("Reservaciones",
        "Parece que la información no está correcta. <br> Revisa en completar todos campos requeridos",
        TipoMessage.error);
      return;
    }

    //? Esto no puede ser editado por cliente, por lo que no necesita eso

    //TODO Revisamos la data
    console.log(this.formReservations.value);

    //* Validamos horas
    let fechaSeleccionada = new Date(this.formReservations.get("fecha_hora").value);
    let fechaAhora = new Date();

    //* Validación de fechas

    //* Valida si ya la reservación expiró la fecha actual
    if (fechaSeleccionada.getDate() > fechaAhora.getDate() && fechaSeleccionada.getTime() > fechaAhora.getTime()){
    if (fechaSeleccionada.getTime() < fechaAhora.getTime()) {
        this.notification.mensaje("Reservaciones",
          "La hora ingresada no es <b>válida</b>.",
          TipoMessage.error);
        return;
      }
      if (fechaSeleccionada.getMinutes() < (fechaAhora.getMinutes() + 30)) {
        this.notification.mensaje("Reservaciones",
          "La hora ingresada debe ser </b>al menos 30m</b> después de la hora actual.",
          TipoMessage.error);
        return;
      }
    }

    //* Accion API create enviando toda la informacion del formulario
    this.gService.update('reservaciones', this.formReservations.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respReservation = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>Reservación número: ${this.respReservation.id} <br> ${this.respReservation.codigo} 
         ha sido <b>actualizada</b> correctamente.</p></div>`
        this.notification.mensaje('Reservaciones', notificationBody, TipoMessage.success);
        //? Rederigimos
        this.router.navigate(['/dashboard/reservaciones'], {
          queryParams: { create: 'true' }
        });
      });
  }

  // asigna el cliente a la reservacion
  asignarCliente(inputCliente: any) {
    this.clienteSeleccionado = inputCliente;
    this.formReservations.patchValue({ idUsuario: this.clienteSeleccionado.id }); //* Únicamente en caso de ser presencial
    console.log(this.formReservations.value)
  }

  //? Filtro de fecha
  setMaxAndMinDates() {
    const today: Date = new Date();
    let currentYear: number = today.getFullYear();
    let currentMonth: number = today.getMonth();
    let currentDay: number = today.getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, currentMonth, (currentDay + 14)); //* Dos semanas más adelante
  }

  //* Solo sirve para actualizar validaciones...
  actualizarCantidad() {
    if (this.isMesaLoaded && this.cantidad == 1) { //* 1 es el default y mínimo
      //* Cargamos el max y el validator
      this.cantidad = this.mesaSelected.capacidad;
      this.formReservations.get('cantidad').addValidators(Validators.max(this.cantidad));
    }
  }

  //* Maneno de errores de forma visual
  public errorHandling = (control: string, error: string) => {
    return (
      this.formReservations.controls[control].hasError(error) &&
      this.formReservations.controls[control].invalid &&
      (this.makeSubmit || this.formReservations.controls[control].touched)
    );
  };

  //* Retorna el nombre completo del usuario cliente actual escogido
  getUserFullName(): String {
    return `${this.clienteSeleccionado.nombre} ${this.clienteSeleccionado.apellido1} ${this.clienteSeleccionado.apellido2}`;
  }

  //* Retorna el nombre completo del cliente seleccionado para mostrarlo en mat-autocomplete
  displayClientName(cliente: any) {
    return cliente ? `${cliente.nombre} ${cliente.apellido1} ${cliente.apellido2}` : '';
  }
}
