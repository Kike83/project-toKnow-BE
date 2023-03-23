const School = require("../models/school.model.js")
const User = require("../models/user.model")
const createError = require ('http-errors')


// Usecase 1 - getAll
// con populate
function getAll () {
    console.log("imprimiendo desde school, usecase de getAll-populate")
    
   return School.find({}).populate('user').populate('groups').populate('announcements').populate('replies')
}


// Usecase 2 - GetById
// con populate
const getById = async (id) =>{
    console.log("imprimiendo desde school, usecase dentro de getById")
    
    const school = await School.findById(id).populate('user').populate('groups').populate('announcements').populate('replies')
    
    if(!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    }

    return school
}


// Usecase 3 - Post
// con poppulate
const create = async(newSchool, userCurrent) => {
    console.log("imprimiendo desde school, usecase dentro de Post")
  
    const userFound = await User.findById(userCurrent)
  
    if(!userFound) {
      const error = createError(404, "El usuario no fue encontrado")
      throw error
    }

    if(userFound.school) {
        const error = createError(400, "El usuario ya tiene una escuela")
        throw error
    }
  
    const schoolToCreate = await School.create({...newSchool, user: userFound._id})
  
    await User.updateOne(
      {_id: userFound._id},
      {
          school: schoolToCreate._id
      }
    )
    return schoolToCreate
  }


// Usecase 4 - Update
const update = async (id,data) =>{
    const school = await School.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return school
}


// Usecase 5 - Delete
const remove = async (id) => {
    const school = await School.findByIdAndDelete(id)
    if (!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    } 
    return school
}


module.exports= {getAll, getById, create, update, remove}