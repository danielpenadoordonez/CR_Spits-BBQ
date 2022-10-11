import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcercaDeRoutingModule } from './acerca-de-routing.module';
import { DevelopmentTeamComponent } from './development-team/development-team.component';
import { AcercaDeIndexComponent } from './acerca-de-index/acerca-de-index.component';
import { AboutCompanyComponent } from './about-company/about-company.component';


@NgModule({
  declarations: [
    DevelopmentTeamComponent,
    AcercaDeIndexComponent,
    AboutCompanyComponent
  ],
  imports: [
    CommonModule,
    AcercaDeRoutingModule
  ]
})
export class AcercaDeModule { }
