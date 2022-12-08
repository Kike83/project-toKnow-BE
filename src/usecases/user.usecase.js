const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const createError = require('http-errors')


// usecase 1 - Create para SignUp
const create = async (userData) => {
  console.log("imprimiendo desde crear un usuario nuevo")

  const hash = await bcrypt.hash(userData.password, 10)
  userData.password = hash
  
  return User.create(userData)
}


// Usecase 2 - GetById
// con populate
const getById = async (id) => {
  console.log("imprimiendo desde user, usecase dentro de getById")
  
  const userById = await User.findById(id).populate('school')
  
  if(!userById) {
    const error = createError(404, "El usuario no fue encontrado")
    throw error
  }

  return userById
}


module.exports = { create, getById }