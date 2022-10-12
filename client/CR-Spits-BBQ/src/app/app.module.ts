import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MesasModule } from './mesas/mesas.module';
import { HttpClientModule } from '@angular/common/http';
import { AcercaDeModule } from './acerca-de/acerca-de.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // importar los módulos creados propios en orden de sin rutas a los que estan con rutas
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    MesasModule,
    // al final el gestor de las rutas principal
    AppRoutingModule,
     AcercaDeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
