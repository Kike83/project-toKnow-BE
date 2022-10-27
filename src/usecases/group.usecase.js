const Group = require ("../models/group.model")
import {Generation} from '../models/generation.model'

// const mongoose = require("monngoose")

//Post
const createGroup = async(newGroup) => {
    
    const generationFound = await Generation.findById(newGroup.generationId)

    if(!generationFound) throw new error('no se encontró la generación', 404);

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

// import {Generation} from '../models/generation.model.js'
// import {School} from '../models/school.model.js'
// import {StatusHttp} from '../libs/statusHttp.js'

// async function create(newGeneration){
//     const schoolFound = await School.findById(newGeneration.school)

//     if(!schoolFound) throw new StatusHttp('No se encontro la escuela', 404)

//     const generationCreated = await Generation.create(newGeneration)

//     await School.updateOne(
//         {_id: schoolFound._id},
//         {
//             $push: { generations: generationCreated._id}
//         }
//     )

//     return generationCreated
// }



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