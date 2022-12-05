import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';
//import * as moment from 'moment';

@Component({
  selector: 'app-reservaciones-form',
  templateUrl: './reservaciones-form.component.html',
  styleUrls: ['./reservaciones-form.component.css']
})
export class ReservacionesFormComponent {

  titleForm: string = 'Crear'; //* Título del form
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false; //* Indica si se subió o no
  clientsList: any; //* en caso de que sea un admin o mesero el que lo cree para que seleccione...
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
  stepMinute = 10;
  stepSecond = 1;
  color: ThemePalette = 'warn'; //* Temas: primary, accent y warn 

  //TODO CONSIDERACIONES:
  //? Cliente se podría obtener por el currentuser o bien en el mat-select 
  //? El código de mesa por params al igual, luego con un api se busca y saco id y sucursal 
  //? Mesero y admin sí pueden editar la cantidad y la fecha y quizás cancelarla
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
        console.log("es crear");
        this.loadMesaByCodigo(codigoMesa);
      } else { //* Update
        console.log("es actualizar");
        //? Para actualizar es necesario el params id uno con idReservacion y luego ya con el api lo sacamos...
        this.loadDataReservation(); //* Si no es update
      }
    });

    //* Cargamos el usuario al inicio
    this.getCurrentUser();
    //* Cargamos las fechas
    this.setMaxAndMinDates();
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
      idUsuario: [null, null], //? Depende puede que sí [cliente], se maneja fuera
      idMesa: null //* No es editable
    });
  }

  //* Limpiamos
  onReset() {
    this.formReservations.reset();
  }

  //* Cargamos la lista de clientes
  listaClientes(): void {
    this.clientsList = null; //* Reset
    this.gService
      .list('users/perfil/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientsList = data;
        //? console.log(this.clientsList);
      });
  }

  //* Cargamos la lista de sucursales
  listaSucursales(){
    this.sucursalesList = null; //* Reset
    this.gService
      .list('users/perfil/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
        //? console.log(this.clientsList);
      });
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );

    if (this.isAuthenticated) {
      if (this.currentUser.user.Perfil.descripcion != "Cliente") {
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
      });
  }

  //* Cargar datos en caso de que sea update...
  loadDataReservation() {
    this.isCreate = false;
    this.loadMesaById(1);
  }

  //* Crear una reservación
  crearReservacion(): void {
    //* Seteamos la validacion, por si acaso no se había cargado
    this.formReservations.get('cantidad').addValidators(Validators.max(this.mesaSelected.capacidad));

  }

  //* Actualizar una reservación
  actualizarReservacion(): void {

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
  actualizarCantidad(){
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

}
