const Generations = require ("../models/generation.model.js")
const createError = require ('http-errors')

const getAll = () =>{
    const generations = Generations.find({})
    return generations
}

const getById = async (id) =>{
    const generation = await Generations.findById(id)
    
    if(!generation){
        const error = createError(404, "Generación no encontrada")
        throw error
    }

    return generation
}

const create = async (data) =>{
    const generation = await Generations.create(data)
    return generation
}

const remove = async (id) => {
    const generation = await Generations.findByIdAndDelete(id)
    if (!generation){
        const error = createError(404, "La generación a sido eliminada")
        throw error
    } 
    return generation
}

const update = async (id,data) =>{
    const generation = await Generations.findByIdAndUpdate(id, data, {returnDocument: "after"})
    return generation
}

module.exports= {getAll, getById, create, update, remove}