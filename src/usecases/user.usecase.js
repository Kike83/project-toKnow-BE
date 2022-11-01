
const User = require("../models/user.model")

const createError = require('http-errors')

const bcrypt = require("bcrypt")

const jwt = require("../lib/jwt.lib")




// Usecase 1 - GetAll
const getAll = () => {
    console.log("imprimiendo desde user.usecase dentro de getAll")
    const users = User.find({})
    return users
}



// Usecase 2 - GetById
const getById = async (id) => {
    console.log("imprimiendo desde user.usecase dentro de getByID")
    const userById = await Teacher.findById( id )
    if(!userById) {
        const error = createError(404, "El user no fue encontrado")
        throw error
    }
    return userById
}



// usecase 3 - Create para SignUp
const create = async (userData) => {
    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    return User.create(userData)
}



// usecase 4 - LogIn

const login = async (email, originalPassword) => {
    const user = await User.findOne({ email })
    if(!user) throw createError(400, "Datos incorrectos")
    
    const validPassword = await bcrypt.compare(originalPassword, user.password)
    if(!validPassword) throw createError(400, "Invalid data")
    
    const token = jwt.sign({ id: user._id })
    console.log("se hizo el token", token)
    return token;
} 



module.exports = { getAll, getById, create, login }