const bcrypt = require("bcrypt");

module.exports.generateEncryptedPassword = password => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports.isPasswordCorrect = (enteredPassword, savedPassword) => {
    return bcrypt.compare(enteredPassword, savedPassword);
}
