const School = require("../models/school.model.js")
const User = require("../models/user.model")
const createError = require ('http-errors')

// const getAll = () =>{
//     const school = School.find({})
//     return school
// }


// con populate
function getAll () {
    console.log("imprimiendo desde school, usecase de getAll-populate")
    
   return School.find({}).populate('user').populate('groups')
}



const getById = async (id) =>{
    const school = await School.findById(id)
    
    if(!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    }

    return school
}


// Usecase - Post
/*
const create = async (schoolData) =>{
    const school = await School.create(schoolData)
    return school
}
*/

// con poppulate
const create = async(newSchool) => {
    console.log("imprimiendo desde group, usecase dentro de Post")
  
    const userFound = await User.findById(newSchool.user)
  
    if(!userFound) {
      const error = createError(404, "El usuario no fue encontrado")
      throw error
    }
  
    const schoolToCreate = await School.create(newSchool)
  
    await User.updateOne(
      {_id: userFound._id},
      {
          $push: { school: schoolToCreate._id}
      }
    )
    return schoolToCreate
  }



const remove = async (id) => {
    const school = await School.findByIdAndDelete(id)
    if (!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    } 
    return school
}

const update = async (id,data) =>{
    const school = await School.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return school
}

module.exports= {getAll, getById, create, update, remove}