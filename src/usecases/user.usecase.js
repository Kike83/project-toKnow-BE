const User = require("../models/user.model");
const createError = require('http-errors')

const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib")


// usecase 1 - Create para SignUp
const create = async (userData) => {
    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    return User.create(userData)
}



// usecase 2 - LogIn

const login = async (email, originalPassword) => {
    const user = await User.findOne({ email })
    if(!user) throw createError(400, "Datos incorrectos")
    
    const validPassword = await bcrypt.compare(originalPassword, user.password)
    if(!validPassword) throw createError(400, "Invalid data")
    
    const token = jwt.sign({ id: user._id })
    console.log("se hizo el token", token)
    return token;
} 



module.exports = { create, login }