const bcrypt = require("bcrypt");

module.exports.generateEncryptedPassword = password => {
    let salt = bcrypt.genSaltSync(10);
    encryptedPassword = bcrypt.hashSync(password, salt);
    //Retorna un diccionario con el salt usado para encriptar y el hash
    return { "salt" : salt, "passwordHash" : encryptedPassword}
}

module.exports.isPasswordCorrect = (enteredPassword, savedPassword, salt) => {
    //return bcrypt.compare(enteredPassword, savedPassword);
    enteredPassword = bcrypt.hashSync(enteredPassword, salt);
    //console.log(`Hash Ingresado ${enteredPassword} - Hash Guardado ${savedPassword}`)
    return enteredPassword == savedPassword;
}
