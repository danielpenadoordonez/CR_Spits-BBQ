import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeIndexComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ],
  exports: [
    HomeIndexComponent
  ]
  
})
export class HomeModule { }
