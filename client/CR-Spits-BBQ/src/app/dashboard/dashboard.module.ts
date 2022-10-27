import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { BodyIndexComponent } from './body-index/body-index.component';


@NgModule({
  declarations: [
    SidenavComponent,
    DashboardIndexComponent,
    DashboardBodyComponent,
    BodyIndexComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Angular Material
    MatIconModule
  ],
  exports: [
    DashboardIndexComponent,
    BodyIndexComponent,
  ]
})
export class DashboardModule { }
