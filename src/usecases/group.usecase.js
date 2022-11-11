const Group = require ("../models/group.model")
const createError = require('http-errors')



// Usecase 1 - GetAll
const getAll = async() => {
  console.log("imprimiendo desde group, usecase dentro de getAll")
  
  const groups = await Group.find({}).
  populate('schoolId', 'studentId','teacherId')

  return groups
}



// Usecase 2 - GetById
const getById = async (id) => {
  console.log("imprimiendo desde group, usecase dentro de getById")
  
  const groupById = await Group.findById(id).populate('schoolId', 'studentId','teacherId')
  
  if(!groupById) {
    const error = createError(404, "El grupo no fue encontrado")
    throw error
  }

  return groupById
}



// Usecase 3 - Post
const create = async(newGroup) => {
    console.log("imprimiendo desde group, usecase dentro de Post")

    const groupToCreate = await Group.create(newGroup)

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