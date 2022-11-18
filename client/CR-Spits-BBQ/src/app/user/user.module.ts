import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    InicioSesionComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
