
const User = require("../models/user.model")

const createError = require('http-errors')

const bcrypt = require("bcrypt")



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






module.exports = { getAll, getById, create }



