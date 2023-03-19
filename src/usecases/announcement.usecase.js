const Announcement = require("../models/announcement.model")
const User = require("../models/user.model")
const School = require("../models/school.model")
const Group = require("../models/group.model")
const Teacher = require("../models/teacher.model")
const createError = require('http-errors')


// Usecase 1 - getAll
// con populate
function getAll () {
    console.log("imprimiendo desde anuncios, usecase de getAll-populate")

    return Announcement.find({}).populate('school').populate('user').populate('group').populate('replies')
}


// Usecase 2 - GetById
// con populate
const getById = async (id) => {
    console.log("imprimiendo desde anuncios, usecase dentro de getById")

    const announcement = await Announcement.findById(id).populate('school').populate('user').populate('group').populate('replies').populate('user')

    if(!announcement){
        const error = createError(404, "Anuncio no encontrado")
        throw error
    }
    
    return announcement
}


// Usecase 3 - Post
// con populate
const create = async(newAnnouncement, userCurrent, roleCurrent) => {
    console.log("imprimiendo desde anuncios, usecase dentro de Post")

    const userFound = await User.findById(userCurrent)
    const teacherFound = await Teacher.findById(userCurrent)

    if(!userFound && !teacherFound) {
        const error = createError(404, "El usuario o profesor no fue encontrado")
        throw error
    }

    const school = userFound?.school || teacherFound?.school

    const announcementToCreate = await Announcement.create({...newAnnouncement, school, user: userFound?._id, teacher: teacherFound?._id})

    await School.updateOne(
        {_id: school},
        {
            $push: { announcements: announcementToCreate._id}
        }
    )

    const groupFound = await Group.findById(newAnnouncement.group)

    if(!groupFound) {
        console.log("anuncio enviado sin grupo")
    }

    if(groupFound) {
        await Group.updateOne(
            {_id: groupFound._id},
            {
                $push: { announcements: announcementToCreate._id}
            }
        )
    }
    
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


// Usecase 6 - get-By-School-Id
const getBySchoolId = async(schoolId) => {
    console.log("imprimiendo desde anuncios, usecase de get-By-School-Id")

    const announcementFound = await Announcement.find({ school: schoolId, group: null })

    return announcementFound
}




// Usecase 7 - get-By-Group-Id
const getByGroupId = async(groupId) => {
    console.log("imprimiendo desde anuncios, usecase de get-By-Group-Id")

    const announcementFound = await Announcement.find({ group: groupId })

    return announcementFound
}





module.exports = { getAll, getById, create, update, remove, getBySchoolId, getByGroupId }