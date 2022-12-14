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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcercaDeModule } from './acerca-de/acerca-de.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { ToastrModule } from 'ngx-toastr';
import { ReservacionesModule } from './reservaciones/reservaciones.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //* importar los módulos creados propios en orden de sin rutas a los que estan con rutas
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    MesasModule,
    PedidosModule,
    ProductosModule,
    ReservacionesModule,
    AcercaDeModule,
    DashboardModule,
    //* al final el gestor de las rutas principal
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
