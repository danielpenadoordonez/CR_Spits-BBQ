import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductoComponent } from './gestion-producto/gestion-producto.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';

const routes: Routes = [
  //* Rutas ordenadas 
  { path: 'productos', component: GestionProductoComponent },
  { path: 'productos/all', component: ProductosAllComponent },
  { path: 'productos/create', component: ProductosFormComponent },
  { path: 'productos/update/:id', component: ProductosFormComponent }
];
//* No se necesita ruta con el id y el detail, es innecesaria 100%

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
