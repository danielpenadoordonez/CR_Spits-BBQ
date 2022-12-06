module.exports.generateReservacionCode = (idSucursal, previousNum) => {
    let reservationCode = `CRSB-0${idSucursal}-`;
    let newNumber = parseInt(previousNum) + 1;
    reservationCode += newNumber;
    return reservationCode;
}

module.exports.getPreviousNumber = (reservations) => {
    let highestNum = 0;
    //* Recorrer todas los pedidos y buscar el numero mayor para retornarlo
    const getNumber = (reservation) => {
        highestNum = reservation.codigo.split("-")[2];
    }
    console.log(reservations);
    reservations.forEach(getNumber);
    return highestNum;
}