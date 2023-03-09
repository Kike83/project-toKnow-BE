const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema({
    text: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    },
}, {
    timestamp: true
})

const Announcement = mongoose.model('announcements', announcementSchema)

module.exports = Announcement