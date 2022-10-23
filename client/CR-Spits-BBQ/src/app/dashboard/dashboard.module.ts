import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { PruebaComponent } from './prueba/prueba.component';


@NgModule({
  declarations: [
    SidenavComponent,
    DashboardIndexComponent,
    DashboardBodyComponent,
    PruebaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Angular Material
    MatIconModule
  ],
  exports: [
    DashboardIndexComponent
  ]
})
export class DashboardModule { }
