const School = require("../models/school.model")

const getAll = () =>{
    const school = School.find({})
    return school
}

const getById = (id) =>{
    const school = School.findById(id)
    return school
}

const createSchool = async (schoolData) =>{
    const school = await School.create(schoolData)
    return school
}

const deleteSchool = async (id) => {
    const school = await School.findByIdAndDelete(id)
    if (!school){
        const error = new Error ("School not found")
        error["status"] = 404
        throw error
    } 
    return school
}

const updateSchool = async (id,data) =>{
    const school = await School.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return school
}

module.exports= {getAll,getById, createSchool, deleteSchool, updateSchool}