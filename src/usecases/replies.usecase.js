const Reply = require("../models/replies.model")
const User = require("../models/user.model")
const School = require("../models/school.model")
const Group = require("../models/group.model")
const Announcement = require("../models/announcement.model")
const Teacher = require("../models/teacher.model")
const Parent = require("../models/parent.model")
const createError = require('http-errors')


// Usecase 1 - getAll
function getAll () {
    console.log("imprimiendo desde replies, usecase de getAll")

    return Reply.find({}).populate('user').populate('school').populate('group').populate('announcement')
}


// Usecase 2 - getById
const getById = async (id) => {
    console.log("imprimiendo desde replies, usecase dentro de getById")

    const reply = await Reply.findById(id).populate('user').populate('school').populate('group').populate('announcement')

    if(!reply){
        const error = createError(404, "Reply no encontrado")
        throw error
    }

    return reply
}


// Usecase 3 - Post
const create = async(newReply, userCurrent, roleCurrent) => {
    console.log("imprimiendo desde replies, usecase dentro de Post")

    const userFound = await User.findById(userCurrent)
    const teacherFound = await Teacher.findById(userCurrent)

    if(!userFound && !teacherFound) {
        const error = createError(404, "El usuario o teacher no fue encontrado")
        throw error
    }

    const school = userFound?.school || teacherFound?._id

    console.log("imprimiendo teacherFound:", teacherFound)
 
    const replyToCreate = await Reply.create({...newReply, user: userFound?._id, school, teacher: teacherFound?._id})

    await School.updateOne(
        {_id: school},
        {
            $push: { replies: replyToCreate._id}
        }
    )


    const groupFound = await Group.findById(newReply.group)

    if(groupFound) {
        await Group.updateOne(
            {_id: groupFound._id},
            {
                $push: { replies: replyToCreate._id }
            }
        )
    }

    const announcementFound = await Announcement.findById(newReply.announcement)

    if(!announcementFound) {
        console.log("reply enviado sin anuncio")
    }

    if(announcementFound) {
        await Announcement.updateOne(
            {_id: announcementFound._id},
            {
                $push: { replies: replyToCreate._id}
            }
        )
    }
    


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