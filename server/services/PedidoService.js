module.exports.generateNombrePedido= (idSucursal, previousNum) => {
    let tableCode = `CRSB-0${idSucursal}-`;
    let newNumber = parseInt(previousNum) + 1;
    tableCode += newNumber;
    return tableCode;
}

module.exports.getPreviousNumber = (pedidos) => {
    let highestNum = 0;
    //Recorrer todas las mesas y buscar el numero mayor para retornarlo
    const getNumber = (pedido) => {
        highestNum = pedido.codigo.split("-")[2];
    }
    pedidos.forEach(getNumber);
    return highestNum;
}