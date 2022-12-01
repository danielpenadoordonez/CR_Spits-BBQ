const bcrypt = require("bcrypt");

module.exports.generateEncryptedPassword = password => {
    let salt = bcrypt.genSaltSync(10);
    encryptedPassword = bcrypt.hashSync(password, salt);
    //Retorna un diccionario con el salt usado para encriptar y el hash
    return { "salt" : salt, "passwordHash" : encryptedPassword}
}

module.exports.isPasswordCorrect = (enteredPassword, savedPassword, salt) => {
    //Se genera el hash de la contraseña ingresada con el salt que se uso para encriptar
    //la contraseña del usuario para luego comparar los hashes
    enteredPassword = bcrypt.hashSync(enteredPassword, salt);
    return enteredPassword == savedPassword;
}
