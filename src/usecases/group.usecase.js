const Group = require ("../models/group.model")
const School = require ("../models/school.model")
const createError = require('http-errors')
const User = require("../models/user.model")


// Usecase 1 - GetAll
// con populate
function getAll() {
  console.log("imprimiendo desde group, usecase dentro de getAll-populate")

  return Group.find({}).populate('school').populate('students').populate('teachers')
}


// Usecase 2 - GetById
const getById = async (id) => {
  console.log("imprimiendo desde group, usecase dentro de getById")
  
  const groupById = await Group.findById(id).populate('school').populate('students').populate('teachers')
  
  if(!groupById) {
    const error = createError(404, "El grupo no fue encontrado")
    throw error
  }

  return groupById
}



// Usecase 3 - Post
// con poppulate
const create = async(newGroup, userCurrent) => {
  console.log("imprimiendo desde group, usecase dentro de Post")

  const userFound = await User.findById(userCurrent)
  
    if(!userFound) {
      const error = createError(404, "El usuario no fue encontrado")
      throw error
    }

  const school = userFound.school

  const groupToCreate = await Group.create({...newGroup, school})

  await School.updateOne(
    {_id: school},
    {
        $push: { groups: groupToCreate._id}
    }
  )
  return groupToCreate
}



// Usecase 4 - Update
const update = (id, groupData) => {
  const groupToUpdate = Group.findByIdAndUpdate(id, groupData, { returnDocument: 'after' })
  
  return groupToUpdate
}



// Usecase 5 - Delete
const remove = (id) => {
  const groupToDelete = Group.findByIdAndDelete(id)

  return groupToDelete
}




module.exports = { getAll, getById, create, update, remove }