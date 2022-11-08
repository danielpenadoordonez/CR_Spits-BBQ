import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-mesas-form',
  templateUrl: './mesas-form.component.html',
  styleUrls: ['./mesas-form.component.css']
})

export class MesasFormComponent {
  titleForm: string = 'Crear'; //* Le indica al título si es crear o actualizar es dinámico
  destroy$: Subject<boolean> = new Subject<boolean>(); //* Destruye la petición del API
  sucursalesList: any; //* Sucursal a la que será asignada 
  disponibilidadesList: any; //* Tipo de disponibilidad: ocupada, reservada, libre... etcétera
  mesaInfo: any; //? información de la mesa a actualizar [previa]
  respMesa: any; //* Respuesta que deja la mesa en la acción de crear o actualizar
  submitted = false; //? Enviado? Sí o no?
  mesasForm: FormGroup; //* El nombre del formulario - [SENSIBLE]
  //! ES EL CÓDIGO NO EL ID
  idMesa: string = ""; //* guardamos el parámetro o el código que lo que llega
  isCreate: boolean = true; //* si es update o create

  /* 
  * FORMATO JSON - MESA
  * "capacidad": 4,
  * "estado": true,
  * "idSucursal": 2,
  * "idDisponibilidad": 2
  */

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute,
    private notification: NotificacionService) {
    this.formularioReactive();
    this.listaSucursales();
    this.listaDisponibilidades();
  }

  //* Actualizar sí se envían los datos con el update
  ngOnInit(): void {
    //* Verificar si se envio un id por parametro para crear formulario para actualizar
    //* Obtener mesa a actualizar del API
    this.activeRouter.params.subscribe((params: Params) => {
      this.idMesa = params['id']; //? Recibe el código
      if (this.idMesa !== undefined) { //* Validamos que no esté indefinido (id enviado por params)
        this.isCreate = false;
        this.titleForm = 'Actualizar'; //* Cambiamos el título
        this.gService.get('mesas/codigo', this.idMesa)
          .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            this.mesaInfo = data; //* Obtenemos la data y la asignamos
            //! ESTABLEZCO TODOS, Solo que código no es editable y el id es invisible [hidden]
            //? Solo puedo usar el set value si establezco TODOS LOS CAMPOS DE LA TABLA por eso el comentario...
            this.mesasForm.setValue({
              id: this.mesaInfo.id,
              codigo: this.mesaInfo.codigo,
              capacidad: this.mesaInfo.capacidad,
              estado: this.mesaInfo.estado,
              idSucursal: this.mesaInfo.idSucursal,
              idDisponibilidad: this.mesaInfo.idDisponibilidad
            });
          });
      }
    })
  }

  //* Crear Formulario
  //* Con su validaciones
  formularioReactive() {
    //? [null, Validators.required]
    this.mesasForm = this.fb.group({
      //* Nombre del FormControl: [valor, validación]
      id: null, //* No válida [invisible] - input hidden
      codigo: null, //* No válida [readonly - show on update] - se genera en el backend seguiendo las reglas del formato correspondiente
      //? Único campo en el que el usuario puede digitar
      capacidad: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(10), Validators.pattern('^[0-9]*$') //? Sólo números
      ])],
      estado: [null, Validators.required], //? radio buttons - habilitado - deshabilitado, usar Validators.requiredTrue para checkboxes, mas no para radio
      idSucursal: [null, Validators.required], //* Sucursal, solo 1 [combobox - 1 no múltiple]
      idDisponibilidad: [null, Validators.required]//*  Combo box, solo 1 igualmente, sin múltiples
    });
  }

  //* Carga la lista de sucursales para el combo
  listaSucursales() {
    this.sucursalesList = null;
    this.gService
      .list('sucursales') //* ruta para llamar esa API, viene del generic service, Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  //* Carga la lista de disponibilidades de mesa para el combo
  listaDisponibilidades() {
    this.disponibilidadesList = null;
    this.gService
      .list('disponibilidades') //* Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.disponibilidadesList = data;
      });
  }

  //* Manejo de errores - público
  public errorHandling = (control: string, error: string) => {
    return this.mesasForm.controls[control].hasError(error);
  };

  //* Crear Mesa [POST]
  crearMesa(): void {

    //* Establecer submit verdadero 
    this.submitted = true; //* Sí se subió

    //* Verificar validación del form
    if (this.mesasForm.invalid) {
      return;
    }

    //! tener cuidado con el formato
    //* Revisar el formato con un console log, nunca viene mal
    console.log(this.mesasForm.value);

    //* Accion API create enviando toda la informacion del formulario
    this.gService.create('mesas', this.mesasForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respMesa = data; //* Obtenemos y asignamos la data
        // Se muestra una notificacion al usuario
        this.notification.mensaje('Mesas', `Mesa: ${this.respMesa.codigo} ha sido creada.`, TipoMessage.success);
        //? Rederigimos
        this.router.navigate(['dashboard/mesas'], {
          queryParams: { create: 'true' }
        });
      });
  }


  //* Actualizar una mesa [PUT]
  actualizarMesa() {
    //* Establecer submit verdadero - Sí hace submit el update
    this.submitted = true; //* Sí se subió

    //* Verificar validación del form
    if (this.mesasForm.invalid) {
      console.log('invalid:');
      return;
    }

    //? Verificamos la data
    console.log(this.mesasForm.value);

    //* Accion API create enviando toda la informacion del formulario
    this.gService.update('mesas', this.mesasForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respMesa = data; //* Obtenemos y asignamos la data
        //? Redirigimos
        this.notification.mensaje('Mesas', `Mesa: ${this.respMesa.codigo} ha sido actualizada.`, TipoMessage.success);
        this.router.navigate(['/dashboard/mesas'], {
          queryParams: { update: 'true', code: data.codigo }
        });
      });
  }

  onReset() {
    //* Resetear
    this.submitted = false;
    this.mesasForm.reset();
  }

  onBack() {
    //* Cuando intenté salir - botón salir
    this.router.navigate(['dashboard/mesas']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }
}
