import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: [
    './pedidos-form.component.css',
    './../../mesas/gestion-mesas/gestion-mesas.component.css',
    './../../productos/gestion-producto/gestion-producto.component.css',
  ],
})
export class PedidosFormComponent {
  scripts = ['swiper-bundle.min.js'];

  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  clientsList: any; //* Lista de clientes
  sucursalesList: any; //* lista de sucursales
  listaOrdenes: any; //* Lista de pedidos
  statesList: any; //* Lista de estados de pedido
  typeOrdersList: any; //* Lista tipos de órdenes (presencial & online)
  pedidoInfo: any; //? información del producto a actualizar [UPDATE]
  respPedido: any; //* Respuesta del API ante [UPDATE - CREATE]
  submitted = false; //? Se envío?
  pedidosForm: FormGroup; //* El nombre del formulario [CUIDADO]
  idPedido: number = 0; //* id del pedido [int]
  isCreate: boolean = true; //* si es update o create
  isCarritoLoaded: boolean = false; //* Sirve para saber si cargó o no el carrito
  isPedidoPresencial: boolean = true; //* Indica el tipo de pedido, por default true
  dataSourceCarrito: any = null;

  productData: any; //* lista productos
  cartData: any;
  totalOrder: any;
  subTotalOrder: any;
  impuestoOrder: any;
  qtyItems: any;
  //data table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['producto'];

  isAuthenticated: boolean;
  currentUser = null; //* Obtener de la suscripción

  cliente: any; //* Cliente del pedido
  mesa: any; //* Mesa obtenida por medio del queryParams
  clienteSeleccionado: any; //* Guardar el cliente seleccionado por el filtro

  inputFiltro = new FormControl('');
  filteredOptions: Observable<any[]>;

  sucursalSelected: number = -1;
  /*
  * FORMATO JSON - PEDIDO
! CUIDADO CON LA FECHA Y SU FORMATO, SINO ENVIAR POR DEFAULT (HOY)
        * "id" : 1 (autoincrement)
        * "nombre": "CRSB-01-12",
        * "precio": 15000,
        * "fecha": "2022-11-22", -- Puede usar default
        * "idEstado": 6, -- estados
        * "idCliente": "65440685802",
        * "idMesero": "463650893", -- Viene del servicio de autentificación
        * "idSucursal": 1,
        * "idMesa": 3, -- Lista de mesas?
        * "idTipoPedido": 1,
        * "detalles":
          ? [] -- CUIDADO
  */

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificacionService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private scriptService: LoadScriptsService,
    private cartService: CartService
  ) {
    this.getCurrentUser();
    this.formularioReactive();
    //! this.listaClientes(); se inhabilitan debido a que solo tienen uso con update
    
    //! this.listaOrderStates(); - Arreglar luego
    this.listaTiposOrden();
    this.listaPedidos();
  }

  //? Update del pedido - recordar bloquear el filtro de sucursal si es mesero
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let pedido = params['idPedido'] || null; //* No voy a borrar esto, pues nunca se sabe
      let codigoMesa = params['codigoMesa'] || null;
      if (pedido != null) {
        //* Significa que es update
        //* Sirve para ver el preview...
        this.isCreateOrUpdate(); //* Cambia a false el isCreate
        this.getMesaDetail();
        this.asignarCarritoUpdate(codigoMesa);
      } else {
       if(codigoMesa != null ){
         //* Create
         this.getMesaDetail();
         this.checkIfExistOldItemsOnCreate(codigoMesa);
         this.isCarritoLoaded = true;
       }
      }
      this.scriptService.loadScript(this.scripts[0], this.scripts[0]);
    });

    if (this.currentUser.user.idPerfil == 3) {
      //* Se settea que es online
      this.isPedidoPresencial = false;
      this.getMesaDetail();
    }

    this.getProductData();
  }

  ngAfterViewInit(): void {
    this.setTableStyles();
  }

  setProductBySucursal(sucursal: number){
    this.sucursalSelected = sucursal;
    if(this.mesa != undefined || this.mesa != null){
      this.mesa.idSucursal = this.sucursalSelected;
    }
    this.getProductData();
  }

  setTableStyles() {
    (
      document.querySelector('#pedido-product-table tbody') as HTMLElement
    ).classList.add('grid-table-body');
    (
      document.querySelector('#pedido-product-table thead') as HTMLElement
    ).classList.add('grid-table-head');
  }

  filtrarProducto(evento) {
    let filtro = evento.target.value;
    this.gService
      .list('productos/all-hability')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        data = data.filter((producto) =>
          producto.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        this.productData = data;
        this.dataSource = new MatTableDataSource(this.productData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  //* filtra nombre completo en mat-autocomplete
  private _filter(value: any): any[] {
    console.log(value);
    const filterValue = value;

    return this.clientsList.filter(
      (clients) =>
        clients.nombre.toLowerCase().includes(filterValue) ||
        clients.apellido1.toLowerCase().includes(filterValue) ||
        clients.apellido2.toLowerCase().includes(filterValue)
    );
  }

  formularioReactive() {
    //? [null, Validators.required]
    this.pedidosForm = this.fb.group({
      id: null, //* No se puede editar - autoincrement
      nombre: null, //* Viene del backend automático
      precio: null, //* Este campo se autocácula con base en los detalles - se envía nulo - [DEFAULT]
      fecha: [
        //? Vigila si es admin y de feria edita
        null,
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern(/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/), //? Formato fecha MM/dd/yyyy
        ]), //* [DEFAULT]
      ],
      idEstado: null, //* Se elige el primer estado 1 - [DEFAULT]
      idCliente: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(100),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ], //? Se elige de un combo box - A no ser que sea cliente
      idMesero: null, //? Se asigna por el servicio
      idSucursal: null, //? Se asigna por la sucursal a la que esté asignada la mesa elegida o bien por el mesero
      idMesa: null, //? Se elige en el inicio - [OPCIONAL - ONLINE]
      idTipoPedido: [
        null,
        this.currentUser.user.idPerfil == 1 ? Validators.required : null,
      ], //* Se auto hace, si es un cliente es online, sino es presencial - [DEFAULT PRESENCIAL]
      detalles: null, //* Cambiar cuando se añada el carro
      cliente: null,
    });
  }

  //* agregar al carrito
  addToCart(id: number) {
    if(this.currentUser.user.Perfil.idPerfil != 3){
      if (
        (this.isCreate && this.cartService.idMesa == '') ||
        this.cartService.idMesa
      ) {
        this.cartService.idMesa = this.mesa.codigo;
        console.log(`Código de mesa ${this.mesa.codigo}`);
      }
    }

    this.gService
      .get('productos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //* Agregar el producto seleccionado usando la API
        this.cartService.addToCart(data, this.mesa.codigo);
        //* Notificar al usuario
        this.notification.mensaje(
          'Pedido',
          `Producto: ${data.nombre} se ha agregado a la orden 🛒`,
          TipoMessage.success
        );
        this.cartData = this.cartService.getItems.filter(
          (item) => item.mesa == this.mesa.codigo
        );
        this.qtyItems = this.cartData.length;
        this.setTotalsOrder(this.mesa.codigo);
      });
  }

  setTotalsOrder(mesa: string) {
    this.subTotalOrder = this.cartService.getTotal(mesa);
    this.totalOrder = this.cartService.getTotalConImpuestos(mesa);
    this.impuestoOrder = this.totalOrder - this.subTotalOrder;
  }

  toggleCartData() {
    document.querySelector('.cart-data').classList.toggle('show-cart-data');
    this.toggleCartDataCover();
  }

  toggleCartDataCover() {
    document
      .querySelector('.cart-data-back-cover')
      .classList.toggle('show-cart-data-back-cover');
  }

  expandTotal() {
    let indinf = document.querySelector('.total-details');
    indinf.classList.toggle('show-total-details');
    document
      .querySelector('.expand-total-icon')
      .classList.toggle('expand-total-icon-rotate');
  }

  addNote(idItem: any, event: any) {
    let note: string = event.target.value;
    if (this.mesa && this.mesa != null) {
      this.cartService.addItemNote(idItem, note, this.mesa.codigo);
    }
  }

  // Sobrecarga metodo
  addNoteClick(idItem: any) {
    let note: string = document.getElementById(idItem).textContent;
    if (this.mesa && this.mesa != null) {
      this.cartService.addItemNote(idItem, note, this.mesa.codigo);
    }
  }

  //* Obtiene la próxima orden
  nextIdOrder() {
    let max: number = this.listaOrdenes.length || null;
    console.log(`new car ${++max}`);
    return max;
  }

  listaPedidos() {
    this.listaOrdenes = null;
    this.gService
      .list('pedidos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listaOrdenes = data;
      });
  }

  //* Elegir al cliente? [unique]
  listaClientes() {
    this.clientsList = null;
    this.gService
      .list('users/perfil/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientsList = data;
        this.filteredOptions = this.inputFiltro.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
      });
  }

  //* Seleccionar una sucursal [unique - cuidado con la condición de mesero]
  listaSucursales() {
    this.sucursalesList = null;
    this.gService
      .list('sucursales')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursalesList = data;
      });
  }

  //! AÚN NO EXISTE UN API QUE LLAME ESTO
  listaOrderStates() {
    this.statesList = null;
    this.gService
      .list('estados')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.statesList = data;
      });
  }

  listaTiposOrden() {
    this.typeOrdersList = null;
    this.gService
      .list('tipo-pedidos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.typeOrdersList = data;
      });
  }

  //* Manejo de errores - público
  public errorHandling = (control: string, error: string) => {
    return this.pedidosForm.controls[control].hasError(error);
  };

  getMesaDetail() {
    this.route.queryParams.subscribe((params) => {
      let idMesa = params['idMesa'] || null;
      let codigoMesa = params['codigoMesa'] || null;
      if (idMesa != null) {
        this.gService
          .get('mesas', idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.mesa = data;
          });
      }
      if (codigoMesa != null) {
        this.gService
          .get('mesas/codigo', codigoMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.mesa = data;
          });
      }

      if(this.currentUser.user.idPerfil == 3){
        let codigoVirtual = this.currentUser.user.id + Date.now().toString();
        this.mesa =  {codigo: codigoVirtual, idSucursal: this.sucursalSelected};
      }
    });
  }

  getProductData() {
    let hileraValidadora: string;
    if(this.currentUser.user.idPerfil != 3){
      hileraValidadora = this.currentUser.user.idPerfil == 1
      ? 'productos/all-hability'
      : `productos/sucursal/${this.currentUser.user.sucursales[0].id}`;
    }else{
      if(this.sucursalSelected == -1){
        return;
      }else{
        hileraValidadora = `productos/sucursal/${this.sucursalSelected}`
      }
    }
    this.gService
      .list(hileraValidadora)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.productData = data;
        this.dataSource = new MatTableDataSource(this.productData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  //* Cambia el tipo dependiendo de la modalidad que se escoja
  asignarTipoPedido(inputTipoPedido: any) {
    this.isPedidoPresencial = inputTipoPedido.value == 1;
    console.log(this.isPedidoPresencial);
  }

  //* Sirve para asignar el cliente, pq esta kk no va bien
  asignarCliente(inputCliente: any) {
    this.clienteSeleccionado = inputCliente;
    this.pedidosForm.patchValue({ idCliente: this.clienteSeleccionado.id }); //* Únicamente en caso de ser presencial
    console.log(this.pedidosForm.value);
  }

  isCreateOrUpdate(): void {
    this.activeRouter.queryParams.subscribe((params: Params) => {
      this.idPedido = params['idPedido']; //? Recibe el id [int]
      console.log(this.idPedido);
      if (this.idPedido !== undefined) {
        this.isCreate = false; //* No... es actualizar
        this.titleForm = 'Actualizar';
        this.gService
          .get('pedidos', this.idPedido) //? Trae por medio del id númerico [int]
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.pedidoInfo = data;
            this.pedidosForm.setValue({
              id: this.pedidoInfo.id,
              nombre: this.pedidoInfo.nombre,
              precio: this.pedidoInfo.precio,
              fecha: this.pedidoInfo.fecha,
              idEstado: this.pedidoInfo.idEstado,
              idCliente: this.pedidoInfo.idCliente,
              idMesero: this.pedidoInfo.idMesero,
              idSucursal: this.pedidoInfo.idSucursal,
              idMesa: this.pedidoInfo.idMesa,
              idTipoPedido: this.pedidoInfo.idTipoPedido,
              detalles: null, //* No se mapea
              //* Nombre del cliente compuesto
              cliente: `${this.pedidoInfo.Cliente.nombre} ${
                this.pedidoInfo.Cliente.apellido1
              } ${
                this.pedidoInfo.Cliente.apellido2 != undefined
                  ? this.pedidoInfo.Cliente.apellido2
                  : ''
              }`,
            });
          });
      }
    });
  }

  asignarCarritoUpdate(codigoMesa: string): void {
    this.cartService.idMesa = codigoMesa;
    this.cartService.refrescarCarrito();
    this.isCarritoLoaded = true;
    this.cartService.currentDataCart$.subscribe((data) => {
      data = data.filter((cartItem) => cartItem.mesa == codigoMesa);
      this.cartData = data;
    });
    this.qtyItems = this.cartData.length;
    this.setTotalsOrder(codigoMesa);
  }

  //* get Current User
  getCurrentUser() {
    //* Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      //* si el usuario que registra la orden es el mismo cliente se asigna automaticamente como cliente
      if (this.currentUser.user.Perfil.descripcion == 'Cliente') {
        this.cliente = x.user;
        this.listaSucursales();
      } else {
        //* si no liste clientes
        this.listaClientes();
      }
    });
    //* Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
  }

  //* Retorna el nombre completo del usuario cliente actual escogido
  getUserFullName(): String {
    return `${this.cliente.nombre} ${this.cliente.apellido1} ${this.cliente.apellido2}`;
  }

  //* Retorna el nombre completo del cliente seleccionado para mostrarlo en mat-autocomplete
  displayClientName(cliente: any) {
    return cliente
      ? `${cliente.nombre} ${cliente.apellido1} ${cliente.apellido2}`
      : '';
  }

  crearPedido() {
    //* Establecer submit verdadero
    //* Es necesario insertar las líneas de detalle igualmente
    console.log('intentando crear pedido');
    this.submitted = true;

    //* Parcheamos values restantes - no del form
    //? En el onchange de online, validar esto
    if (!this.isPedidoPresencial) {
      //* Se asigna el mismo id
      this.pedidosForm.patchValue({ idCliente: this.currentUser.user.id });
    }
    this.pedidosForm.patchValue({ idMesero: this.currentUser.user.id });
    this.pedidosForm.patchValue({ idSucursal: this.mesa.idSucursal }); //? De donde sale la sucursal si es online?
    if (this.currentUser.user.idPerfil != 3 && this.isPedidoPresencial) {
      //* Diferente de cliente o que la orden sea online
      this.pedidosForm.patchValue({ idMesa: this.mesa.id });
    } else {
      this.pedidosForm.patchValue({ idMesa: undefined });
    }

    //* Vigilamos la data
    console.log(this.pedidosForm.value);

    if (this.pedidosForm.invalid) {
      this.notification.mensaje(
        'Productos',
        'Parece que la información no está correcta. <br> Revisa en completar todos campos requeridos',
        TipoMessage.error
      );
      return;
    }

    //? ojo con tipo de pedido
    this.pedidosForm.patchValue({
      precio: undefined,
      idEstado: undefined,
      detalles: [],
    });
    if (this.currentUser.user.idPerfil != 1) {
      //* Solo el admin puede escoger tipo y modificarlo...
      this.pedidosForm.patchValue({
        idTipoPedido: this.currentUser.user.idPerfil == 3 ? 2 : 1,
      });
    }

    //* Vigilamos la data
    console.log(this.pedidosForm.value);

    this.gService
      .create('pedidos/register', this.pedidosForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respPedido = data;
        //* Notificacion de la tarea realizada
        let notificationBody = `<div class='flexbox'><p>Pedido número #: ${this.respPedido.data.id} <br> ${this.respPedido.data.nombre} 
                                ha sido <b>registrado éxitosamente</b>.</p></div>`;
        this.notification.mensaje(
          'Productos',
          notificationBody,
          TipoMessage.success
        );
        //? Redirigimos
        this.router.navigate(['/dashboard/comandas'], {
          queryParams: { update: 'true' },
        });
      });
  }

  actualizarPedido() {
    //* La idea de esto es las líneas detalle.. solamente
    console.log('hola update');
  }

  // Remueve un item
  removeItem(idItem: number) {
    if (this.mesa && this.mesa != null) {
      this.cartService.removeOneToOneFromCart(idItem, this.mesa.codigo);
      this.cartData = this.cartService.getItems;
      this.setTotalsOrder(this.mesa.codigo);
    }
  }

  removeAllItems(idItem: number) {
    if (this.mesa && this.mesa != null) {
      this.cartService.removeAllItems(idItem, this.mesa.codigo);
      this.cartData = this.cartService.getItems;
      this.setTotalsOrder(this.mesa.codigo);
    }
  }

  checkIfExistOldItemsOnCreate(mesa: string) {
    let listCart = this.cartService.getItems;
    listCart = listCart.filter((item) => item.mesa == mesa);
    listCart.forEach((item) => {
      this.cartService.removeAllItems(item.idItem, mesa);
    });
  }

  onReset() {
    //* Resetear
    this.submitted = false;
    this.pedidosForm.reset();
    this.inputFiltro.reset();
    this.checkIfExistOldItemsOnCreate(this.mesa.codigo);
    this.cartData = this.cartService.getItems.filter(
      (item) => item.mesa == this.mesa.codigo
    );
    this.qtyItems = this.cartData.length;
    this.setTotalsOrder(this.mesa.codigo);
  }

  onBack() {
    //* Cuando intenté salir - botón salir
    this.router.navigate(['/dashboard/mesas']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //* Desinscribirse
    this.destroy$.unsubscribe();
  }

  //? Filtro de fecha - que no sea menor y que no se pase de 1 semana
  dateFilter = (d: Date | null): boolean => {
    const datePicked = d || new Date();
    let dateToday = new Date();
    return (
      datePicked.getDate() >= dateToday.getDate() &&
      datePicked.getDate() < dateToday.getDate() + 7 &&
      datePicked.getMonth() == dateToday.getMonth()
    );
  };
}
