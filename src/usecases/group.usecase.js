const Group = require ("../models/group.model")
const Generation = require ('../models/generation.model')

// const mongoose = require("monngoose")

//Post
const createGroup = async(newGroup) => {
    
    const generationFound = await Generation.findById(newGroup.generationId)

    if(!generationFound) throw new Error('no se encontró la generación', 404);

    const groupCreated = await Group.create(newGroup)

    await Generation.updateOne(
      {_id:generationFound._id},
      {
        $push:{ groups: groupCreated._id}
      }
    )
    return groupCreated
  }
//Get
const getAll = async() => {
    // console.log("estoy en getALL")
    const groups = await Group.find({}).populate('generationId', 'studentId','teacherId' )

    return groups
}


// Get by id
const getById = async (id) => {
    // console.log("estoy en getById")
    const group = await Group.findById(id)
    return group
}

//Update
const updateGroup = (id, groupData) => {
    return (group = Group.findByIdAndUpdate(id, groupData))
  }
  
// Delete
const removeGroup = (id) => {
    return (group = Group.findByIdAndDelete(id))
  }





module.exports = {
  createGroup, 
  getAll, 
  getById, 
  updateGroup, 
  removeGroup}