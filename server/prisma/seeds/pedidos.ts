//* Corresponden a las comandas, utiliza doble usuario


//? tanto fecha como idMesa son OPCIONALES, ya que los que usan el servicio de forma online, no necesitan una mesa...
//? la fecha se auto asigna
export const pedidos = [
    //* Presenciales - Con detalles
    {
        nombre: 'CRSB-01-01',
        precio: 15000,
        fecha: new Date('2022-11-5'),
        idEstado: 6,
        idCliente: '65440685802',
        idMesero: '463650893',
        idSucursal: 1,
        idMesa: 3,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-01-02',
        precio: 20200,
        fecha: new Date('2022-11-7'),
        idEstado: 6,
        idCliente: '508459062',
        idMesero: '463650893',
        idSucursal: 1,
        idMesa: 1,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-02-01',
        precio: 12800,
        fecha: new Date('2022-11-8'),
        idEstado: 5,
        idCliente: '65440685802',
        idMesero: '365730621',
        idSucursal: 2,
        idMesa: 13,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-04-01',
        precio: 19200,
        fecha: new Date('2022-11-9'),
        idEstado: 4,
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
        nombre: 'CRSB-01-03',
        precio: 27100,
        fecha: new Date('2022-11-13'),
        idEstado: 4,
        idCliente: '65440685802',
        idMesero: '65440685802',
        idSucursal: 1,
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-02-02',
        precio: 37600,
        fecha: new Date('2022-11-14'),
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '167459042',
        idSucursal: 2,
        idTipoPedido: 2
    },
    {
        nombre: 'CRSB-04-02',
        precio: 27100,
        fecha: new Date('2022-11-14'),
        idEstado: 5,
        idCliente: '167459042',
        idMesero: '167459042',
        idSucursal: 4,
        idTipoPedido: 2
    },
    //* Mixto - SIN DETALLES!! - pendientes a agregar por mantenimiento
    {
        nombre: 'CRSB-03-01',
        //precio: 0, //? Pq no tiene detalles - igual aplica el valor default (0)
        fecha: new Date('2022-11-16'),
        idEstado: 3,
        idCliente: '167459042',
        idMesero: '40625724512',
        idSucursal: 3,
        idMesa: 26,
        idTipoPedido: 1
    },
    {
        nombre: 'CRSB-02-03',
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
        nombre: 'CRSB-02-04',
        //precio: 0, //? Pq no tiene detalles
        //? Fecha default get by data base configuration
        idEstado: 3,
        idCliente: '508459062',
        idMesero: '508459062',
        idSucursal: 2,
        idMesa: 19,
        idTipoPedido: 2
    }
];