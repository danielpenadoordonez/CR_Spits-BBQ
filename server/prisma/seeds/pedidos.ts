//* Corresponden a las comandas, utiliza doble usuario


//? tanto fecha como idMesa son OPCIONALES, ya que los que usan el servicio de forma online, no necesitan una mesa...
//? la fecha se auto asigna
export const pedidos = [
    //* Presenciales - Con detalles
    //* Actualizados con el impuesto de ventas del 0.13% - 04/12/2022
    {
        nombre: 'CRSB-01-1',
        precio: 16950,
        fecha: new Date('2022-11-5'),
        idEstado: 3,
        idCliente: '65440685802',
        idMesero: '463650893',
        idSucursal: 1,
        idMesa: 3,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-01-2',
        precio: 22826,
        fecha: new Date('2022-11-7'),
        idEstado: 3,
        idCliente: '508459062',
        idMesero: '463650893',
        idSucursal: 1,
        idMesa: 1,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-02-1',
        precio: 14464,
        fecha: new Date('2022-11-8'),
        idEstado: 3,
        idCliente: '65440685802',
        idMesero: '365730621',
        idSucursal: 2,
        idMesa: 13,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-04-1',
        precio: 21696,
        fecha: new Date('2022-11-9'),
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '207636120',
        idSucursal: 4,
        idMesa: 40,
        idTipoPedido: 1
    },
    //* Online - Con detalles
    //? Cuando el pedido es online, el id de quien lo haga aplica para ambos
    //? Tampoco usan mesa...
    { 
        nombre: 'CRSB-01-3',
        precio: 30623,
        fecha: new Date('2022-11-13'),
        idEstado: 3,
        idCliente: '65440685802',
        idMesero: '65440685802',
        idSucursal: 1,
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-02-2',
        precio: 42488,
        fecha: new Date('2022-11-14'),
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '167459042',
        idSucursal: 2,
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-04-2',
        precio: 30623,
        fecha: new Date('2022-11-14'),
        idEstado: 2,
        idCliente: '167459042',
        idMesero: '167459042',
        idSucursal: 4,
        idTipoPedido: 2
    },
    //* Mixto - SIN DETALLES!! - pendientes a agregar por mantenimiento
    {
        //* N° 8
        nombre: 'CRSB-03-1',
        //precio: 0, //? Pq no tiene detalles - igual aplica el valor default (0)
        fecha: new Date('2022-11-16'),
        idEstado: 2,
        idCliente: '167459042',
        idMesero: '40625724512',
        idSucursal: 3,
        idMesa: 26,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-02-3',
        //precio: 0, //? Pq no tiene detalles
        //? Fecha hoy.. (día en el que se haga el migrate)
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '365730621',
        idSucursal: 2,
        idMesa: 20,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-02-4',
        //precio: 0, //? Pq no tiene detalles
        //? Fecha default get by data base configuration
        idEstado: 3,
        idCliente: '508459062',
        idMesero: '508459062',
        idSucursal: 2,
        idTipoPedido: 2 //* Online
    },
    {
        nombre: 'CRSB-04-3',
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '167459042',
        idSucursal: 4, //* Sin mesa, es online pá
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-03-2',
        idEstado: 3,
        idCliente: '508459062',
        idMesero: '508459062',
        idSucursal: 3, 
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-03-3',
        idEstado: 3,
        idCliente: '206450674',
        idMesero: '206450674',
        idSucursal: 3, 
        idTipoPedido: 2
    },
];