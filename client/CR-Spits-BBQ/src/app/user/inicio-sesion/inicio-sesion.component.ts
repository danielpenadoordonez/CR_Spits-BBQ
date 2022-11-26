import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { sociaLoginData } from './social-login';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  socialLoginData = sociaLoginData;
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }

  //* Definir el formulario con su reglas de validación
  reactiveForm() {
    /* 
    * https://angular.io/guide/reactive-forms
   * https://angular.io/api/forms/Validators 
   */

    this.formulario = this.fb.group({
      username: [null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]+$/)])],
      clave: [null,
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/)])]
    });
  }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let register = false;
    let auth = true;
    //* Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params['register'] === 'true' || false;
      auth = params['auth'] === 'false' || true;
      if (register) {
        this.notificacion.mensaje(
          'Usuario',
          'Registro satisfactorio! Especifique su credenciales para ingresar',
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.warning
        );
      }
    });
  }
  onReset() {
    this.formulario.reset();
  }

  submitForm() {
    this.makeSubmit = true;

    //* Validación

    if (this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);

    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(['/']);
      });
  }

  //* Manejar errores de formulario en Angular 

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
