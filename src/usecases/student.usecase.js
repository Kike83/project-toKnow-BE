const Student = require("../models/student.model")
const Group = require("../models/group.model")
const createError = require('http-errors')



// Usecase 1 - Get
// con populate
function getAll() {
    console.log("imprimiendo desde student, usecase dentro de getAll")

    return Student.find({}).populate('groups').populate('parents')
}



// Usecase 2 - GetById
const getById = async (id) => {
    console.log("imprimiendo desde student.usecase dentro de getByID")
    const studentById = await Student.findById( id ).populate('parents')

    if(!studentById) {
        const error = createError(404, "El student no fue encontrado")
        throw error
    }
    
    return studentById
}



// Usecase 3 - Post
//con populate
const create = async(newStudent) => {
    console.log("imprimiendo desde student, usecase dentro de Post-populate")
  
    const groupFound = await Group.findById(newStudent.groups)
  
    if(!groupFound) {
      const error = createError(404, "El grupo no fue encontrado")
      throw error
    }
  
    const studentToCreate = await Student.create(newStudent)
  
    await Group.updateOne(
      {_id: groupFound._id},
      {
          $push: { students: studentToCreate._id}
      }
    )
    return studentToCreate
  }
  





// Usecase 4 - Patch
const update = (id, studentData) => {
    const studentToPatch = Student.findByIdAndUpdate(id, studentData, { returnDocument: 'after' })
    return studentToPatch
    }



// Usecase 5 - Delete
const remove = async(id) => {
    console.log("imprimiendo desde student, usecase dentro de Delete")

    const studentToDelete = Student.findByIdAndDelete(id)

    await Group.updateMany(
        {},
        { $pull: { students: id } }
    );

    return studentToDelete
}





module.exports = { getAll, getById, create, update, remove }
