const Student = require("../models/student.model")
const Group = require("../models/group.model")
const createError = require('http-errors')



// Usecase 1 - Get
// con populate
function getAll() {
    console.log("imprimiendo desde student, usecase dentro de getAll")

    return Student.find({}).populate('groups')
}



// Usecase 2 - GetById
const getById = async (id) => {
    console.log("imprimiendo desde student.usecase dentro de getByID")
    const studentById = await Student.findById( id )
    if(!studentById) {
        const error = createError(404, "El student no fue encontrado")
        throw error
    }
    return studentById
}



// Usecase 3 - Post
const create = async (studentData) => {
    console.log("imprimiendo desde student.usecase dentro del Post")
    const studentToCreate = await Student.create( studentData )
    return studentToCreate
}



// Usecase 4 - Patch
const update = (id, studentData) => {
    const studentToPatch = Student.findByIdAndUpdate(id, studentData, { returnDocument: 'after' })
    return studentToPatch
    }



// Usecase 5 - Delete
const remove = (id) => {
    const studentToDelete = Student.findByIdAndDelete(id)
    return studentToDelete
    }





module.exports = { getAll, getById, create, update, remove }
