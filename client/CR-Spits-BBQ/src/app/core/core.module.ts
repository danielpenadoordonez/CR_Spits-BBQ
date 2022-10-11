import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StaticAnimationComponent } from './static-animation/static-animation.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu'; 



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    StaticAnimationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,

    // Imports de material
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    StaticAnimationComponent
  ]
})
export class CoreModule { }
