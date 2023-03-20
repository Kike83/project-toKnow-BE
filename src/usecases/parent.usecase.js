const Parent = require ("../models/parent.model")
const Student = require("../models/student.model")
const createError = require('http-errors')
const bcrypt = require("bcrypt")

  
// Usecase 1 - GetAll
function getAll() {
  console.log("imprimiendo desde parent, usecase dentro de getAll")

  return Parent.find({}).populate('students')
}



// Usecase 2 - GetById
const getById = async (id) => {
  console.log("imrpimiendo desde parent.usecase dentro de getById")
  const parentById = await Parent.findById(id).populate('students')

  if(!parentById) {
    const error = createError(404, "El padre/tutor no fue encontrado")
    throw error
  }
  
  return parentById
}



// Usecase 3 - Post
// con populate
const create = async(newParent, schoolId) => {
  console.log("imprimiendo desde parent, usecase dentro de Post-populate")

  const studentFound = await Student.findById(newParent.students)

  if(!studentFound) {
    const error = createError(404, "El estudiante no fue encontrado")
    throw error
  }

  const hash = await bcrypt.hash(newParent.password, 10)
  newParent.password = hash

  const parentToCreate = await Parent.create({...newParent, school: schoolId})

  await Student.updateOne(
    {_id: studentFound._id},
    {
        $push: { parents: parentToCreate._id}
    }
  )
  return parentToCreate
}



// Usecase 4 - Update
const update = (id, parentData) => {
  console.log("imprimiendo desde parent.usecase dentro de Update")
  const parentToPatch = Parent.findByIdAndUpdate(id, parentData, { returnDocument: 'after'})
  return parentToPatch
  }



// Usecase 5 - Delete
const remove = (id) => {
    console.log("imprimiendo desde parent.usecase dentro de Delete")
    const parentToDelete = Parent.findByIdAndDelete(id)
    return parentToDelete
  }





module.exports = { getAll, getById, create, update, remove }