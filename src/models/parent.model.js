const mongoose = require("mongoose")


const parentSchema = new mongoose.Schema({
    name: {
        type: String,               
        minlength: 3,
        maxlength: 30,
        required: true
    },
    lastNameA: {
        type: String
    },
    lastNameB: {
        type: String               
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    phone: {
        type: Number
    },
    gender: {
        type: String
    }
}, {
    timestamp: true
})


const Parent = mongoose.model("parents", parentSchema)


module.exports = Parent
