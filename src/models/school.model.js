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
    }
}, {
    timestamp: true
})


const School = mongoose.model('schools', schoolSchema)


module.exports = School