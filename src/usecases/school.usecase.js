const School = require("../models/school.model")
const createError = require ('http-errors')

const getAll = () =>{
    const school = School.find({})
    return school 
}

const getById = async (id) =>{
    const school = await School.findById(id)   
    if(!school)throw error = createError(404, "Escuela no encontrada")
    return school
}

const create = async (data) =>{
    const school = await School.create(data)
    return school
}

const deleteSchool = async (id) => {
    const school = await School.findByIdAndDelete(id)
    if(!school)throw error = createError(404, "Escuela no encontrada")
    return school
}

const update = async (id,data) =>{
    const school = await School.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return school
}

module.exports= {getAll, getById, create, deleteSchool, update}