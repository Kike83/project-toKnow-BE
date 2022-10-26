const Group = require ("../models/group.model")
import {Generation} from '../models/generation.model'

// const mongoose = require("monngoose")

//Post
const createGroup = (groupData) => {
    // console.log = ("create", groupData)
    const postGroup = Group.create(groupData)
    return postGroup
  }
//Get
const getAll = async() => {
    // console.log("estoy en getALL")
    const groups = await Group.find({}).populate('generation', 'student','teacher' )

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