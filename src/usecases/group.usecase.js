const Group = require ("../models/group.model")
// const mongoose = require("monngoose")

//Post
const createGroup = (groupData) => {
    console.log = ("create", groupData)
    const postGroup = Group.create(groupData)
    return postGroup
  }
//Get
const getAll = async() => {
    console.log("estoy en getALL")
    const groups = await Group.find({})

    return groups
}

// Get by id
const getById = async (id) => {
    console.log("estoy en getById")
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





module.exports = {createGroup, getAll, getById, updateGroup, removeGroup}