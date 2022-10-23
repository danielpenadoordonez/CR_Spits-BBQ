import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeIndexComponent } from './home/home-index/home-index.component';

const routes: Routes = [
  {path: '', component: HomeIndexComponent, redirectTo:'', pathMatch:'full' },
 // {path: '**', component: PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
