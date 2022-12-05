import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./../inicio-sesion/inicio-sesion.component.css', './registro.component.css']
})
export class RegistroComponent {
  //* Registro de usuario by MarioBC
  hide = true;
  usuario: any;
  perfiles: any; //* Corresponden a los perfiles del usuario sea Administrador, Mesero o Cliente
  sucursales: any // corresponde a la sucursal que irá un mesero
  formRegister: FormGroup;
  makeSubmit: boolean = false; //* Indica si se subió o no
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any; //* Corresponde al usuario que esta usando esto
  isAuthenticated: boolean; //* Es para saber si está o no autentificado
  isSecondSection: boolean;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notification: NotificacionService
  ) {
    this.reactiveForm();
  }

  //* Formato JSON - Register user
  /* 
       * "id": "665370123",
       * "nombre": "Nathalie",
       * "apellido1": "Montes",
       * "apellido2": "Luna", //? Opcional
       * "correo": "nathalieMontes@gmail.com",
       * "username": "nathaliee",
       * "clave": "1234567809",
       * "telefono": "69737014",
       ! "direccion" : "Solo el personal usa este campo",
       ! "idPerfil": 1, // Solo para admin, sino va por default (3) y no se envía nada por patch 
       ! "sucursales": [{"id" : 1}] Vincular a un mesero con sucursal
  */

  reactiveForm(): void {
    this.formRegister = this.fb.group({
      id: [null, Validators.compose([ //* Cédula
        Validators.required
      ])],
      nombre: [null, Validators.compose([ //* Obligatorio
        Validators.required
      ])],
      apellido1: [null, Validators.compose([ //* No opcional
        Validators.required
      ])],
      apellido2: [null, Validators.compose([ //? Opcional
        Validators.required
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      correo: [null, Validators.compose([ //* Obligatorio, sigue formato de email común y corriente
        Validators.required, Validators.email
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      username: [null, Validators.compose([ //* Se tiene que seguir el patrón y reglas para el mismo [obligatorio]
        Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]+$/)
      ])],
      clave: [null, Validators.compose([ //* Obligatorio, se sigue los lineamientos de contraseña
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/)
      ])],
      claveConfirm: [null, Validators.compose([ //* Obligatorio, se sigue los lineamientos de contraseña
      Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/)
    ])],
      telefono: [null, Validators.compose([ //* Obligatorio 
        Validators.required
      ])],
      direccion: [null, Validators.compose([ //? Opcional solo para el personal

      ])],
      idPerfil: [null, Validators.compose([ //? Opcional solo si lo registra un admin

      ])],
      sucursales: [null, Validators.required] //? Una lista de selección unique
    });
    this.getPerfiles();
  }

  ngOnInit() {
    this.getCurrentUser(); //* Cargamos el usuario
    this.getPerfiles(); // lsita de perfiles
    this.listaSucursales(); // lista sucursales
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor) //* Lo suscribimos para obtener el valor y saber si se autentificó o no...
    );
    console.log(this.currentUser);
  }

  submitForm() {
    console.log(this.currentUser); //? para saber si lo pone como nulo o undefined
    this.makeSubmit = true;
    //* Validación
    if (this.formRegister.invalid) {
      this.notification.mensaje("Registro",
        "Parece que la información ingresada no es correcta. <br> Revisa en completar todos campos requeridos",
        TipoMessage.error);
      return;
    }

    //! Validaciones de que no se haya registrado aún 
    //! OJO UNIQUE: id, username, correo
    if (this.isValidationID("")) {
      this.notification.mensaje("Registro",
        "Parece que la cédula ingresado <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    if (this.isValidationEmail("")) {
      this.notification.mensaje("Registro",
        "Parece que el correo electrónico ingresado <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    if (this.isValidationUsername("")) {
      this.notification.mensaje("Registro",
        "Parece que el nombre de usuario <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    //! Validaciones en caso de que registre un admin o bien alguien sin log
    console.log("Perfil:" + this.formRegister.value.idPerfil)
    if (this.currentUser !== undefined && this.isAuthenticated && this.formRegister.value.idPerfil != 3 && this.currentUser.idPerfil == 1) { //* Que no sea usuario
      //! Validaciones dependiendo de a qué perfil registre
      if (this.formRegister.value.idPerfil == 1) { //* Admin
        //* Recuerde hacer el patch format si seleccionan varias 
        //* multiple
      }
    } else {
      //* Registra alguien sin logearse
      this.formRegister.patchValue({ sucursales: [] });
    }

    //? Notificar claro...

    //* Si pasa la autentificación
    //* Se devuelve para que inicie sesión con la cuenta que acaba de crear
    this.authService
      .createUser(this.formRegister.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(['/users/login'], {
          queryParams: { register: 'true' },
        });
      });
  }

  onReset() {
    this.formRegister.reset();
  }

  getPerfiles() {
    this.gService
      .list('perfiles')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.perfiles = data;
        //? console.log(this.perfiles);
      });
  }
  listaSucursales() {
    this.sucursales = null;
    this.gService
      .list('sucursales') //* ruta para llamar esa API, viene del generic service, Sí sirve
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursales = data;
      });
  }


  isValidationID(id: string): boolean {
    let validation: boolean = true; //* Sí pasa
    return validation;
  }

  isValidationUsername(username: string): boolean {
    let validation: boolean = true;
    return validation;
  }

  isValidationEmail(email: string): boolean {
    let validation: boolean = true;
    return validation;
  }

  //* Mesero solo se asigna a una sucursal, pero admin puede tener varias
  toggleMultipleSucursales(): void {
    //! [multiple]
  }

  //* Maneno de errores de forma visual
  public errorHandling = (control: string, error: string) => {
    return (
      this.formRegister.controls[control].hasError(error) &&
      this.formRegister.controls[control].invalid &&
      (this.makeSubmit || this.formRegister.controls[control].touched)
    );
  };

  nextStage(){
    document.querySelector('.first-register-section').classList.toggle('show-first-section');
    document.querySelector('.second-register-section').classList.toggle('show-second-section');
    this.isSecondSection = !this.isSecondSection;
  }
}
