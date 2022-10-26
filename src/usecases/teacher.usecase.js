const Teacher = require("../models/teacher.model")
const createError = require('http-errors')

const { findByIdAndUpdate } = require("../models/teacher.model")



// Usecase 1 - GetAll
const getAll = () => {
    console.log("imprimiendo desde teacher.usecase dentro de getAll")
    const teachers = Teacher.find({})
    return teachers
}



// Usecase 2 - GetById
const getById = async (id) => {
    console.log("imprimiendo desde teacher.usecase dentro de getByID")
    const teacherById = await Teacher.findById( id )
    if(!teacherById) {
        const error = createError(404, "El teacher no fue encontrado")
        throw error
    }
    return teacherById
}



// Usecase 3 - Post
const create = async (teacherData) => {
    console.log("imprimiendo desde teacher.usecase dentro de Post")
    const teacherToCreate = await Teacher.create( teacherData )
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
