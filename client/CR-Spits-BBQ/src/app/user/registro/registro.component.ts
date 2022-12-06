import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  hide = true; //* Clave 1
  hide2 = true; //* Clave 2
  usuario: any;
  perfiles: any; //* Corresponden a los perfiles del usuario sea Administrador, Mesero o Cliente

  sucursales: any; //* Corresponden a la lista de sucursales a las que se puede asignar el mesero (1) y administrador varias
  formRegister: FormGroup;
  makeSubmit: boolean = false; //* Indica si se subió o no
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any; //* Corresponde al usuario que esta usando esto

  isSecondSection: boolean;
  isAuthenticated: boolean = false; //* Es para saber si está o no autentificado
  isMultipleSucursal: boolean = false; //* Sirve para manejar si se trabaja una (mesero) o varias sucursales (admin)
  isPasswordsValid: boolean = false; //* Maneja adecuadamente si las contraseñas están bien o no
  toggleMultiple: boolean = true; //* Solo sirve para evitar problemas con multiple
  profileRegister: number = 3; //* Por default se usa cliente 
  datosUser: any; //* Variable únicamente usada para cargar validaciones
  private direccionValidators: any = [Validators.required, Validators.minLength(10), Validators.maxLength(150), Validators.pattern(/^([a-zA-z0-9ÑñáéíóúüÁÉÍÓÚÜ/\\''(),-\s]{2,200})$/)];

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
    this.getCurrentUser(); //* Cargamos el usuario
    this.getPerfiles(); //* lista de perfiles
    this.listaSucursales(); //* lista sucursales
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
        Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^[1-7][0-9]*$/) //? Solo acepta números, no acepta espacios siguiendo el formato de cédula
        //? 9 cédula residencial y hasta 12 la extranjera...
      ])],
      nombre: [null, Validators.compose([ //* Obligatorio
        Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\\s]+$/) //* Solo letras, espacios y acentos en español
        //* En caso de que alguien tenga un nombre exajerado
      ])],
      apellido1: [null, Validators.compose([ //* No opcional
        Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\]+$/) //* Solo letras, SIN espacios y acentos en español
      ])],
      apellido2: [null, Validators.compose([ //? Opcional - Sin required, pero si escriben se valida esto..., a no ser que sea administrativo
        Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-zÑñáéíóúüÁÉÍÓÚÜ\\-\\]+$/) //* Solo letras, SIN espacios y acentos en español
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      correo: [null, Validators.compose([ //* Obligatorio, sigue formato de email común y corriente
        Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(256), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        //? Según Google el mínimo es 3 y el máximo 320, pero prefiero evitar problemas
      ])],
      //? CAMPO UNIQUE -- CUIDADO
      username: [null, Validators.compose([ //* Se tiene que seguir el patrón y reglas para el mismo [obligatorio]
        Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]+$/), //* Letras mayús, minus, números, pero sin espacios ni acentos
      ])],
      clave: [null, Validators.compose([ //* Obligatorio, se sigue los lineamientos de contraseña
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/) //* Literalmente de todo
      ])],
      clave2: [null, Validators.compose([ //* Obligatorio, solo sirve para validar si ambas son iguales, no afecta la subida
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/) //* Literalmente de todo
      ])],
      telefono: [null, Validators.compose([ //* Obligatorio 
        Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[5-9]\d{3}-?\d{4}$/) //* Solo números
      ])],
      //* emplear igualmente [required] en el front
      direccion: [null, Validators.compose([ //? Opcional, solo para el personal - acepta espacios, letras, números, algunos carácteres, acentos, etcétera
        Validators.minLength(10), Validators.maxLength(150), Validators.pattern(/^([a-zA-z0-9ÑñáéíóúüÁÉÍÓÚÜ/\\''(),-\s]{2,200})$/) //* Que esté verificasdo y registre a un admin o mesero
      ])],
      idPerfil: [null, null], //? Opcional solo si lo registra un admin,
      sucursales: [null, null] //? Una lista de selección multiple o unique depende
    });
    this.formRegister.addValidators(
      this.matchValidator(this.formRegister.get('clave'), this.formRegister.get('clave2'))
    );
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

  //* Válida ambas contraseñas
  matchValidator(
    control: AbstractControl,
    controlTwo: AbstractControl
  ): ValidatorFn {
    return () => {
      if (control.value !== controlTwo.value) {
        this.isPasswordsValid = true;
        return { match_error: true }
      };
      this.isPasswordsValid = false;
      return null;
    };
  }

  submitForm() {
    //* Asignamos o limpiamos validadores y valores
    if (this.profileRegister != 3) {
      this.formRegister.get('direccion').setValidators(this.direccionValidators);
      this.formRegister.get('sucursales').addValidators(Validators.required);
      this.formRegister.get('apellido2').addValidators(Validators.required);
    } else {
      this.formRegister.get('direccion').clearValidators();
      this.formRegister.get('sucursales').clearValidators();
      this.formRegister.get('apellido2').clearValidators();
      //* Cliente necesita esto sí o sí
      this.formRegister.patchValue({ sucursales: [], direccion: "" });
    }

    if (this.isAuthenticated) {
      if (this.currentUser.user.idPerfil == 1) {
        this.formRegister.get('idPerfil').setValidators(Validators.required);
      }
    }

    //* Subimos
    this.makeSubmit = true;

    //* Validación
    if (this.formRegister.invalid) {
      this.notification.mensaje("Registro",
        "Parece que la información ingresada no es correcta. <br> Revisa en completar adecuadamente todos los campos requeridos",
        TipoMessage.error);
      return;
    }

    //! Validaciones de que no se haya registrado aún 
    //! OJO UNIQUE: id, username, correo
    //? Revisamos la captura de data

    if (this.isValidationID(this.formRegister.get('id').value)) {
      this.notification.mensaje("Registro",
        "Parece que la cédula ingresado <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    if (this.isValidationEmail(this.formRegister.get('correo').value)) {
      this.notification.mensaje("Registro",
        "Parece que el correo electrónico ingresado <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    if (this.isValidationUsername(this.formRegister.get('username').value)) {
      this.notification.mensaje("Registro",
        "Parece que el nombre de usuario <br> ya se encuentra regitrada en el sistema",
        TipoMessage.warning);
      return;
    }

    //! Validaciones en caso de que registre un admin o bien alguien sin log
    if (this.isAuthenticated && this.profileRegister != 3) { //* Que no sea un cliente
      //! Validaciones dependiendo de a qué perfil registre
      if (this.currentUser.user.idPerfil == 1) { //* Admin logeado - ya que solo el admin puede registrar otros roles
        //? Formato a sucursales 
        switch (this.profileRegister) {
          case 1: //? Admin
            let sFormat: any = this.formRegister.get('sucursales').value.map(x => ({ ['id']: x }));
            this.formRegister.patchValue({ sucursales: sFormat });
            break;
          case 2: //? Mesero
            let idSucursal = this.formRegister.get('sucursales').value;
            this.formRegister.patchValue({ sucursales: [{ id: idSucursal }] });
            break;
          default:
        }
      }
    } else {
      //* Registra alguien sin logearse o cliente
      this.formRegister.patchValue({ idPerfil: 3 });//* Va por default
    }

    //TODO revisamos la data final papá
    console.log(this.formRegister.value)

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
    this.makeSubmit = false;
    this.formRegister.reset();
  }

  //* Carga la lista de perfiles
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


  //* Cargar la lista de sucursales
  getSucursales() {
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursales = data;
        //? console.log(this.sucursales);
      });
  }

  //* Carga la lista de usuarios
  cargarDatosUsuarios() {
    this.gService
      .list('users/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datosUser = data;
        //? console.log(this.datosUser);
      });
  }

  isValidationID(id: string): boolean {
    //? console.log("cedula " + id)
    let validation: boolean = false; //* Se inicializa en false, en caso contrario cambiará
    const buscarUser = this.datosUser.find(function (user, index) { //* Lo buscamos y listo
      if (user.id == id) {
        validation = true; //* Si lo encuentra lo cambia a true
      }
    });

    //? Retorna true si ya existe, false sino
    return validation
  }

  isValidationEmail(email: string): boolean {
    //? console.log("email " + email)
    let validation: boolean = false;
    const buscarUser = this.datosUser.find(function (user, index) {
      if (user.correo == email) {
        validation = true;
      }
    });

    return validation;
  }

  isValidationUsername(username: string): boolean {
    //? console.log("username " + username)
    let validation: boolean = false;
    const buscarUser = this.datosUser.find(function (user, index) {
      if (user.username == username) {
        validation = true;
      }
    });

    return validation;
  }


  //* Mesero solo se asigna a una sucursal, pero admin puede tener varias
  toggleUserProfile(dataEvent: any): void {
    //? obtener la data del $event de tipo de perfil que elija, por default tiene un valor de 3..., pero puede cambiar
    console.log(dataEvent.value);

    this.profileRegister = dataEvent.value; //? igualmente sirve para saber cuando ocultar o no las cosas a cliente con el ngIf
    if (dataEvent.value == 1 || dataEvent.value == 2 && this.profileRegister != 3) {
      //? Resteamos el multiple
      this.toggleMultiple = !this.toggleMultiple;
      setTimeout(() => {
        this.toggleMultiple = !this.toggleMultiple;
      }, 50)
    }

    this.isMultipleSucursal = this.profileRegister == 1; //? Controla el [multiple]
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }

  //* Maneno de errores de forma visual
  public errorHandling = (control: string, error: string) => {
    return (
      this.formRegister.controls[control].hasError(error) &&
      this.formRegister.controls[control].invalid &&
      (this.makeSubmit || this.formRegister.controls[control].touched)
    );
  };

  nextStage() {
    document.querySelector('.first-register-section').classList.toggle('show-first-section');
    document.querySelector('.second-register-section').classList.toggle('show-second-section');
    this.isSecondSection = !this.isSecondSection;
  }
}