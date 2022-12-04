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
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //* Registro de usuario by MarioBC
  hide = true;
  usuario: any;
  perfiles: any; //* Corresponden a los perfiles del usuario sea Administrador, Mesero o Cliente
  formRegister: FormGroup;
  makeSubmit: boolean = false; //* Indica si se subió o no
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any; //* Corresponde al usuario que esta usando esto
  isAuthenticated: boolean; //* Es para saber si está o no autentificado
  isMultipleSucursal: boolean = false; //* Sirve para manejar si se trabaja una (mesero) o varias sucursales (admin)
  profileRegister: number = 3; //* Por default se usa cliente 

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notification: NotificacionService
  ) {
    this.reactiveForm();
  }

  ngOnInit() {
    this.getCurrentUser(); //* Cargamos el usuario al inicio
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor) //* Lo suscribimos para obtener el valor y saber si se autentificó o no...
    );
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
        Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^[0-9]*$/) //? Solo acepta números, no acepta espacios
        //? 9 cédula residencial y hasta 12 la extranjera...
      ])],
      nombre: [null, Validators.compose([ //* Obligatorio
        Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\\s]+$/) //* Solo letras, espacios y acentos en español
        //* En caso de que alguien tenga un nombre exajerado
      ])],
      apellido1: [null, Validators.compose([ //* No opcional
        Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\]+$/) //* Solo letras, SIN espacios y acentos en español
      ])],
      apellido2: [null, Validators.compose([ //? Opcional - Sin required, pero si escriben se valida esto...
        Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\]+$/) //* Solo letras, SIN espacios y acentos en español
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      correo: [null, Validators.compose([ //* Obligatorio, sigue formato de email común y corriente
        Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(256), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        //? Según Google el mínimo es 3 y el máximo 320, pero prefiero evitar problemas
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      username: [null, Validators.compose([ //* Se tiene que seguir el patrón y reglas para el mismo [obligatorio]
        Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]+$/)
      ])],
      clave: [null, Validators.compose([ //* Obligatorio, se sigue los lineamientos de contraseña
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/)
      ])],
      telefono: [null, Validators.compose([ //* Obligatorio 
        Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^[5-9]\d{3}-?\d{4}$/)
      ])],
      direccion: [null, Validators.compose([ //? Opcional, solo para el personal
        Validators.minLength(5), Validators.maxLength(150), Validators.pattern(/^([a-zA-z0-9ÑñáéíóúüÁÉÍÓÚÜ/\\''(),-\s]{2,150})$/), this.isAuthenticated ? this.currentUser.user.idPerfil == 1 && this.profileRegister != 3 ? Validators.required : null : null //* Que esté verificasdo y registre a un admin o mesero
      ])],
      idPerfil: [null, this.isAuthenticated ? this.currentUser.user.idPerfil == 1 && this.profileRegister != 3 ? Validators.required : '' : null], //? Opcional solo si lo registra un admin,
      sucursales: [null, this.isAuthenticated ? this.currentUser.user.idPerfil == 1 && this.profileRegister != 3 ? Validators.required : '' : null] //? Una lista de selección multiple o unique depende
    });
    this.getPerfiles();
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
    if (this.isAuthenticated && this.profileRegister != 3) { //* Que no sea usuario
      //! Validaciones dependiendo de a qué perfil registre
      if (this.currentUser.user.idPerfil == 1) { //* Admin logeado
        switch (this.profileRegister) {
          //? Recuerde hacer el patch format ya sea cliente o mesero lo que se registre
          case 1: //* Admin
            break;
          case 2: //* Mesero

            break;
          default:
            this.notification.mensaje("Registro",
              "⚠ Parece que ha ocurrido un error desconocido, \n 🛈 favor reportar a la administración lo más antes posible",
              TipoMessage.warning);
            return;
        }
      }
    } else {
      //* Registra alguien sin logearse o cliente
      //? falta perfil y dirección con undefined
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
  toggleUserProfile(dataEvent: any): void {
    //? obtener la data del $event de tipo de perfil que elija, por default tiene un valor de 3..., pero puede cambiar
    console.log(dataEvent.value);
    this.profileRegister = dataEvent.value; //? igualmente sirve para saber cuando ocultar o no las cosas a cliente con el ngIf
    this.isMultipleSucursal = this.profileRegister != 3; //? Controla el [multiple]
  }

  //* Maneno de errores de forma visual
  public errorHandling = (control: string, error: string) => {
    return (
      this.formRegister.controls[control].hasError(error) &&
      this.formRegister.controls[control].invalid &&
      (this.makeSubmit || this.formRegister.controls[control].touched)
    );
  };

}
