//* Corresponden a las comandas, utiliza doble usuario


//? tanto fecha como idMesa son OPCIONALES, ya que los que usan el servicio de forma online, no necesitan una mesa...
//? la fecha se auto asigna
export const pedidos = [
    {
        nombre: 'CRSB-01-01',
        precio: 15000,
        fecha : new Date('2022-11-5'),
        idCliente: '65440685802',
        idMesero: '463650893',
        idEstado: 1,
        idMesa: 1,
        idSucursal: 1 
    },
    {
        nombre: 'CRSB-01-02',
        precio: 20200,
        fecha : new Date('2022-11-7'),
        idCliente: '508459062',
        idMesero: '463650893',
        idEstado: 1,
        idMesa: 1,
        idSucursal: 1
    },
    {
        nombre: 'CRSB-01-03',
        precio: 12800,
        fecha : new Date('2022-11-8'),
        idCliente: '65440685802',
        idMesero: '365730621',
        idEstado: 3,
        idMesa: 2,
        idSucursal: 2
    },
    {
        nombre: 'CRSB-01-04',
        precio: 19200,
        fecha : new Date('2022-11-9'),
        idCliente: '167459042',
        idMesero: '207636120',
        idEstado: 4,
        idMesa: 3,
        idSucursal: 4
    },
    //* Sin detalles
    {
        nombre: 'CRSB-01-03',
        //precio: 0, //? Pq no tiene detalles - igual aplica el valor default (0)
        //? Fecha hoy..
        idCliente: '167459042',
        idMesero: '40625724512',
        idEstado: 3,
        idMesa: 3,
        idSucursal: 3
    },
    {
        nombre: 'CRSB-01-01',
        //precio: 0, //? Pq no tiene detalles
        //? Fecha hoy
        idCliente: '167459042',
        idMesero: '365730621',
        idEstado: 3,
        idMesa: 3,
        idSucursal: 2
    },
    //! Más registros en progreso su camarada!!
];