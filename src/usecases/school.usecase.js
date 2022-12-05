const School = require("../models/school.model.js")
const createError = require ('http-errors')

// const getAll = () =>{
//     const school = School.find({})
//     return school
// }


// con populate
const getAll = () =>{
    console.log("imprimiendo desde school, usecase de getAll-populate")
    
    const school = School.find().populate('groups')
    return school
}



const getById = async (id) =>{
    const school = await School.findById(id).populate('groups')
    
    if(!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    }

    return school
}

const create = async (schoolData) =>{
    const school = await School.create(schoolData)
    return school
}

const remove = async (id) => {
    const school = await School.findByIdAndDelete(id)
    if (!school){
        const error = createError(404, "Escuela no encontrada")
        throw error
    } 
    return school
}

const update = async (id,data) =>{
    const school = await School.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return school
}

module.exports= {getAll, getById, create, update, remove}