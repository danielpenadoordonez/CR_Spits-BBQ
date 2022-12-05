import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

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
      * "sucursales" : 
      *   [{"id" : 1}, {"id" : 2}, {"id" : 3}]     
}
  */

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute,
    private notification: NotificacionService) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaSucursales();
  }

  //? Actualizar sí se envían los datos con el update
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id']; //? Recibe el id [int]
      if (this.idProducto !== undefined) {
        this.isCreate = false; //* No... es actualizar
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
              sucursales: this.productoInfo.sucursales.map(({ id }) => id)
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
        Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[A-Za-zÑñáéíóúÁÉÍÓÚ\\-\\\s]+$/) //? Solo letras - Español
      ])],
      descripcion: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(/^[A-Za-z0-9ÑñáéíóúüÁÉÍÓÚÜ,\\-\\\s]+$/) //? Acepta números igualmente
      ])],
      ingredientes: [null, Validators.compose([
        Validators.minLength(5), Validators.maxLength(100), Validators.pattern(/^[A-Za-z0-9ÑñáéíóúüÁÉÍÓÚÜ,\\-\\\s]+$/) //? Es opcional, valida en caso de que tenga algo...
      ])],
      precio: [null, Validators.compose([
        Validators.required, Validators.min(100), Validators.max(100000), Validators.pattern(/^[0-9]*$/) //? Sólo números enteros [decimal, pero no tiene sentido los decimales acá]
      ])],
      imagen: [null, Validators.compose([
        Validators.required, Validators.minLength(25), Validators.maxLength(256), Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*\.[a-zA-Z]{3})$/) //? pattern especial para urls
      ])],
      estado: [null, Validators.required], //? radio buttons - habilitado - deshabilitado, usar Validators.requiredTrue para checkboxes, mas no para radio
      idCategoria: [null, Validators.required], //* Sucursal [only one] - válida que elija uno
      sucursales: [null, Validators.required] //*  Combo box [multiple]
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
    this.sucursalesList = null;
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  //* Obtener el URL de la imagen con el evento onPaste
  ImageOnPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    document.getElementById('imagenProducto').innerText = pastedText;
    this.ShowImage(pastedText);
  }

  //* Muestra imagen creando una nueva tag img
  ShowImage(imgURL) {
    let imgContainer = document.getElementById('product-image-container');
    imgContainer.innerHTML = `<img src='${imgURL}'  alt='Producto' class='product-img' data-aos='zoom-in'>`;
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
      this.notification.mensaje("Productos",
        "Parece que la información no está correcta. <br> Revisa en completar todos campos requeridos",
        TipoMessage.error);
      return; //* Sacamos
    }

    //* Revisar el formato con un console log, nunca viene mal
    console.log(this.productosForm.value);

    //! tener muchísimo cuidado con el formato
    //* Obtener id de sucursal del Formulario y Crear arreglo con {idSucursal: value}
    let gFormat: any = this.productosForm.get('sucursales').value.map(x => ({ ['id']: x }));

    //* Asignar los valores al formulario 
    this.productosForm.patchValue({ sucursales: gFormat });

    //* Accion API create enviando toda la informacion del formulario
    this.gService.create('productos', this.productosForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respProducto = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>Producto código: ${this.respProducto.id} <br> ${this.respProducto.nombre} 
        ha sido <b>creado</b>.</p>
        <img src='${this.respProducto.imagen}' alt='${this.respProducto.nombre}'
        class='notification-img'></div>`
        this.notification.mensaje('Productos', notificationBody, TipoMessage.success);
        //? Rederigimos
        this.router.navigate(['/dashboard/productos'], {
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
      this.notification.mensaje("Productos",
        "Parece que la información no está correcta. <br> Revisa en completar todos campos requeridos",
        TipoMessage.error);
      return;
    }
    //* Subimos
    console.log(this.productosForm.value);

    //? Formato
    //* Obtener id de sucursal del Formulario y Crear arreglo con {idSucursal: value}
    let gFormat: any = this.productosForm.get('sucursales').value.map(x => ({ ['id']: x }));

    //* Asignar los valores al formulario 
    this.productosForm.patchValue({ sucursales: gFormat });

    //* Accion API create enviando toda la informacion del formulario
    this.gService.update('productos', this.productosForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.respProducto = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>Producto código: ${this.respProducto.id} <br> ${this.respProducto.nombre} 
                                ha sido <b>actualizado</b>.</p>
                                <img src='${this.respProducto.imagen}' alt='${this.respProducto.nombre}'
                                class='notification-img'></div>`
        this.notification.mensaje('Productos', notificationBody, TipoMessage.success);
        //? Redirigimos
        this.router.navigate(['/dashboard/productos'], {
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
    this.router.navigate(['/dashboard/productos']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }

}
