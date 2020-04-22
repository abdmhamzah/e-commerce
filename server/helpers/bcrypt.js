const bcrypt = require('bcrypt')
const saltRounds = 8

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash); // true
}

module.exports = { hashPassword, checkPassword }