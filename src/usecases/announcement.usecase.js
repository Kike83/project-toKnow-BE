const Announcement = require("../models/announcement.model")
const User = require("../models/user.model")
const School = require("../models/school.model")
const createError = require('http-errors')


// Usecase 1 - getAll
// con populate
function getAll () {
    console.log("imprimiendo desde anuncios, usecase de getAll-populate")

    return Announcement.find({}).populate('school')
}


// Usecase 2 - GetById
// con populate
const getById = async (id) => {
    console.log("imprimiendo desde anuncios, usecase dentro de getById")

    const announcement = await Announcement.findById(id).populate('school')

    if(!announcement){
        const error = createError(404, "Anuncio no encontrado")
        throw error
    }
    
    return announcement
}


// Usecase 3 - Post
// con populate
const create = async(newAnnouncement, userCurrent) => {
    console.log("imprimiendo desde anuncios, usecase dentro de Post")

    const userFound = await User.findById(userCurrent)

    if(!userFound) {
        const error = createError(404, "El usuario no fue encontrado")
        throw error
    }

    const school = userFound.school

    const announcementToCreate = await Announcement.create({...newAnnouncement, school})

    await School.updateOne(
        {_id: school},
        {
            $push: { announcements: newAnnouncement._id}
        }
    )
    return announcementToCreate
}


// Usecase 4 - Update
const update = (id, announcementData) => {
    const announcementToUpdate = Announcement.findByIdAndUpdate(id, announcementData, { returnDocument: 'after' })

    return announcementToUpdate
}


// Usecase 5 - Delete
const remove = (id) => {
    const announcementToDelete = Announcement.findByIdAndDelete(id)

    return announcementToDelete
}


module.exports = { getAll, getById, create, update, remove }