const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
    nameSchool: {
        type: String
    },
    cct: {
        type: String
    },
    emailSchool: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    phoneSchool: {
        type: Number
    },
    addressStreet: {
        type: String
    },
    addressNumber: {
        type: Number
    },
    postalCode: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'announcements'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'replies'
    }]
}, {
    timestamp: true
})


const School = mongoose.model('schools', schoolSchema)


module.exports = School