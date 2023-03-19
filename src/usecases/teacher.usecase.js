const Teacher = require("../models/teacher.model")
const Group = require("../models/group.model")
const createError = require('http-errors')
const bcrypt = require("bcrypt")



// Usecase 1 - getAll
// con populate
function getAll() {
    console.log("imprimiendo desde teacher.usecase dentro de getAll")
    
    return Teacher.find({}).populate('groups')
}



// Usecase 2 - GetById
const getById = async (id) => {
    console.log("imprimiendo desde teacher.usecase dentro de getByID")
    const teacherById = await Teacher.findById( id ).populate('groups')
    
    if(!teacherById) {
        const error = createError(404, "El teacher no fue encontrado")
        throw error
    }
    return teacherById
}



// Usecase 3 - Post
//con populate
const create = async(newTeacher, schoolId) => {
    console.log("imprimiendo desde teacher, usecase dentro de Post-populate")
  
    const groupFound = await Group.findById(newTeacher.groups)
  
    if(!groupFound) {
      const error = createError(404, "El grupo no fue encontrado")
      throw error
    }

    const hash = await bcrypt.hash(newTeacher.password, 10)
    newTeacher.password = hash

    const teacherToCreate = await Teacher.create({...newTeacher, school: schoolId})
  
    await Group.updateOne(
      {_id: groupFound._id},
      {
          $push: { teachers: teacherToCreate._id}
      }
    )
    return teacherToCreate
  }
  
 


// Usecase 4 - Patch
const update = (id, teacherData) => {
    const teacherToPatch = Teacher.findByIdAndUpdate(id, teacherData, { returnDocument: 'after' })
    return teacherToPatch
    }



// Usecase 5 - Delete
const remove = (id) => {
    const teacherToDelete = Teacher.findByIdAndDelete(id)
    return teacherToDelete
    }





module.exports = { getAll, getById, create, update, remove }
