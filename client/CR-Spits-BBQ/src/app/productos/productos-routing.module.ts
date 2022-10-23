import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductoComponent } from './gestion-producto/gestion-producto.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

const routes: Routes = [
  { path: 'productos', component: GestionProductoComponent},
  { path: 'productos/:id', component: ProductoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
