const User = require("../models/user.model");

const bcrypt = require("bcrypt");


// usecase 1 - Create para SignUp
const create = async (userData) => {
    console.log("imprimiendo desde crear un usuario nuevo")

    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    
    return User.create(userData)
}


module.exports = { create }