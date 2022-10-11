import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaDeIndexComponent } from './acerca-de-index/acerca-de-index.component';
import { DevelopmentTeamComponent } from './development-team/development-team.component';

const routes: Routes = [
  { path: 'About', component: AcercaDeIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcercaDeRoutingModule { }
