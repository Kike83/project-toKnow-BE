const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema({
    announcementTitle: {
        type: String
    },
    announcementText: {
        type: String
    },
    image: {
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
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'replies'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {
    timestamp: true
})

const Announcement = mongoose.model('announcements', announcementSchema)

module.exports = Announcement