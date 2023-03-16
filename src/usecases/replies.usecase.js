const Reply = require("../models/replies.model")
const User = require("../models/user.model")
const School = require("../models/school.model")
const createError = require('http-errors')


// Usecase 1 - getAll
function getAll () {
    console.log("imprimiendo desde replies, usecase de getAll")

    return Reply.find({})
}


// Usecase 2 - getById
const getById = async (id) => {
    console.log("imprimiendo desde replies, usecase dentro de getById")

    const reply = await Reply.findById(id)

    if(!reply){
        const error = createError(404, "Reply no encontrado")
        throw error
    }

    return reply
}


// Usecase 3 - Post
const create = async(newReply) => {
    console.log("imprimiendo desde replies, usecase dentro de Post")

    const replyToCreate = await Reply.create(newReply)

    return replyToCreate
}


// Usecase 4 - Update
const update = (id, replyData) => {
    const replyToUpdate = Reply.findByIdAndUpdate(id, replyData, {returnDocument: 'after' })

    return replyToUpdate
}


// Usecase 5 - Delete
const remove = (id) => {
    const replytoDelete = Reply.findByIdAndDelete(id)

    return replytoDelete
}


module.exports = { getAll, getById, create, update, remove }