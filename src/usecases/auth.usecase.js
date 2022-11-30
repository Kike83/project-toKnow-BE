const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib")



async function loginAdmin(email, password) {
    const userFound = await User.findOne({email})

    if(!userFound) throw new Error('Credenciales invalidas', 400)

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new Error('Credenciales invalidas', 400)

    return jwt.sign({id: userFound._id, role: userFound.role})
}



module.exports = { 
    // login, 
    loginAdmin 
}

