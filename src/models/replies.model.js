const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
    message: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parents'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'announcements'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {
    timestamp: true
})

const Reply = mongoose.model('replies', repliesSchema)

module.exports = Reply