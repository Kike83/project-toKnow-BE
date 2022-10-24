const Parent = require ("../models/parent.model")
// const mongoose = require("monngoose")

//Post
const createParent = (parentData) => {
    console.log = ("create Parent", parentData)
    const postParent = Parent.create(parentData)
    return postParent
  }
//Get
const getAll = async() => {
    console.log("estoy en getALL")
    const parents = await Parent.find({})

    return parents
}

// Get by id
const getById = async (id) => {
    console.log("estoy en getById")
    const parent = await Parent.findById(id)
    return parent
}

//Update
const updateParent = (id, parentData) => {
    return (parent = Parent.findByIdAndUpdate(id, parentData))
  }
  
// Delete
const removeParent = (id) => {
    return (parent = Parent.findByIdAndDelete(id))
  }





module.exports = {createParent, getAll, getById, updateParent, removeParent}