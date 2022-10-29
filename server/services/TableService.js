module.exports.generateTableCode = (idSucursal, previousNum) => {
    let tableCode = `CRSB-0${idSucursal}-`;
    let newNumber = parseInt(previousNum) + 1;
    tableCode += newNumber;
    return tableCode;
}

module.exports.getPreviousNumber = (tables) => {
    let highestNum = 0;
    //Recorrer todas las mesas y buscar el numero mayor para retornarlo
    const getNumber = (table) => {
        highestNum = table.codigo.split("-")[2];
    }
    tables.forEach(getNumber);
    return highestNum;
}