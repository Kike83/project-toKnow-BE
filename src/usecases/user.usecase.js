const User = require("../models/user.model");

const bcrypt = require("bcrypt");


// usecase 1 - Create para SignUp
const create = async (userData) => {
    console.log("imprimiendo desde crear un usuario nuevo")

    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    
    return User.create(userData)
}


// Usecase 2 - getAll 
// con populate
function getAll() {
    console.log("imprimiendo desde user, usecase dentro de getAll-populate")
  
    return User.find({}).populate('school')
  }



module.exports = { create, getAll }