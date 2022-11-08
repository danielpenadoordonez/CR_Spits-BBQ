import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  categoriasList: any; //* Lista de categorías para productos
  sucursalesList: any; //* Lista de sucursales
  productoInfo: any; //? información del producto a actualizar [UPDATE]
  respProducto: any; //* Respuesta del API ante [UPDATE - CREATE]
  submitted = false; //? Se envío?
  productosForm: FormGroup; //* El nombre del formulario [CUIDADO]
  idProducto: number = 0; //* id del producto [int]
  isCreate: boolean = true; //* si es update o create

  /* 
  * FORMATO JSON - PRODUCTO
      * "id": 22,
      * "nombre": "Camarones al Ajillo",
      * "descripcion": "Camarones al ajillo, con pure de papas y vegetales",
      * "ingredientes": "camarones, ajo, papas, brocoli, zanahoria",
      * "precio": 6500,
      * "imagen": "https://i.ibb.co/w61GHrx/camarones-ajillo.png",
      * "estado": true,
      * "idCategoria": 5,
      * "sucursales_producto" : 
      *   [{"idSucursal" : 1}, {"idSucursal" : 2}, {"idSucursal" : 3}]     
}
  */


  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaSucursales();
  }

  //? Actualizar sí se envían los datos con el update
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id']; //? Recibe el id [int]
      if (this.idProducto !== undefined) {
        this.isCreate = false; //* No... es actualizar pá
        this.titleForm = 'Actualizar';
        this.gService.get('productos', this.idProducto) //? Trae por medio del id númerico [int]
          .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            this.productoInfo = data; //* Obtenemos la data y la asignamos
            //? SOLO USO EL SET SI MAPEO ABSOLUTAMENTE TODO
            this.productosForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              ingredientes: this.productoInfo.ingredientes,
              precio: this.productoInfo.precio,
              imagen: this.productoInfo.imagen,
              estado: this.productoInfo.estado,
              idCategoria: this.productoInfo.idCategoria,
              sucursales_producto: this.productoInfo.sucursales_producto.map(({ idSucursal }) => idSucursal)
            });
          });
      }
    })
  }

  //* Formulario de producto con su validaciones respectivas
  formularioReactive() {
    //? [null, Validators.required]
    this.productosForm = this.fb.group({
      id: null, //* No válida - input hidden
      nombre: [null, Validators.compose([
        Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zÑñáéíóúÁÉÍÓÚ\\-\\\s]+$') //? Solo letras - Español
      ])],
      descripcion: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z0-9ÑñáéíóúÁÉÍÓÚ,\\-\\\s]+$') //? Acepta números igualmente
      ])],
      ingredientes: [null, Validators.compose([
        Validators.minLength(5), Validators.pattern('^[A-Za-z0-9ÑñáéíóúÁÉÍÓÚ,\\-\\\s]+$') //? Es opcional, valida en caso de que tenga algo...
      ])],
      precio: [null, Validators.compose([
        Validators.required, Validators.min(100), Validators.max(100000), Validators.pattern('^[0-9]*$') //? Sólo números enteros [decimal, pero no tiene sentido los decimales acá]
      ])],
      imagen: [null, Validators.compose([
        Validators.required, Validators.minLength(25), Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/) //? pattern especial para urls
      ])],
      estado: [null, Validators.required], //? radio buttons - habilitado - deshabilitado, usar Validators.requiredTrue para checkboxes, mas no para radio
      idCategoria: [null, Validators.required], //* Sucursal [only one] - válida que elija uno
      sucursales_producto: [null, Validators.required] //*  Combo box [multiple]
    });
  }

  //* Solo se puede elegir una... [ONE]
  listaCategorias() {
    this.categoriasList = null;
    this.gService
      .list('categ-prods') //? Ojo con el nombre
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categoriasList = data;
      });
  }

  //* Selección múltiple [CUIDADO]
  listaSucursales() {
    this.categoriasList = null;
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  //* Manejo de errores - público
  public errorHandling = (control: string, error: string) => {
    return this.productosForm.controls[control].hasError(error);
  };

  //* Crear Producto [POST]
  crearProducto(): void {
    //* Establecer submit verdadero 
    this.submitted = true;

    //* Verificar validación del form
    if (this.productosForm.invalid) {
      return; //* Sacamos
    }

    //* Revisar el formato con un console log, nunca viene mal
    console.log(this.productosForm.value);

    //! tener muchísimo cuidado con el formato
    //* Obtener id de sucursal del Formulario y Crear arreglo con {idSucursal: value}
    let gFormat: any = this.productosForm.get('sucursales_producto').value.map(x => ({ ['idSucursal']: x }));

    //* Asignar los valores al formulario 
    this.productosForm.patchValue({ sucursales_producto: gFormat });

    //* Accion API create enviando toda la informacion del formulario
    this.gService.create('productos', this.productosForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respProducto = data;
        //? Rederigimos
        this.router.navigate(['/productos/all'], {
          queryParams: { create: 'true' }
        });
      });
  }

  //* Actualizar un producto [PUT]
  actualizarProducto() {
    //* Establecer submit verdadero - Sí hace submit el update
    this.submitted = true;

    //* Verificar validación del form
    if (this.productosForm.invalid) {
      return;
    }
    //* Subimos
    console.log(this.productosForm.value);

    //? Formato
    //* Obtener id de sucursal del Formulario y Crear arreglo con {idSucursal: value}
    let gFormat: any = this.productosForm.get('sucursales_producto').value.map(x => ({ ['idSucursal']: x }));

    //* Asignar los valores al formulario 
    this.productosForm.patchValue({ sucursales_producto: gFormat });

    //* Accion API create enviando toda la informacion del formulario
    this.gService.update('productos', this.productosForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respProducto = data;
        //? Redirigimos
        this.router.navigate(['/productos/all'], {
          queryParams: { update: 'true' }
        });
      });
  }

  onReset() {
    //* Resetear
    this.submitted = false;
    this.productosForm.reset();
  }

  onBack() {
    //* Cuando intenté salir - botón salir
    this.router.navigate(['/productos/all']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }

}
