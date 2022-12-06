module.exports.generateNombrePedido= (idSucursal, previousNum) => {
    let nombrePedido = `CRSB-0${idSucursal}-`;
    let newNumber = parseInt(previousNum) + 1;
    nombrePedido += newNumber;
    return nombrePedido;
}

module.exports.getPreviousNumber = (pedidos) => {
    let highestNum = 0;
    //* Recorrer todas los pedidos y buscar el numero mayor para retornarlo
    const getNumber = (pedido) => {
        highestNum = pedido.nombre.split("-")[2];
    }
    pedidos.forEach(getNumber);
    return highestNum;
}