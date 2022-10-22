const mongoose = require("mongoose")


const parentSchema = new mongoose.Schema({
    name: {
        type: String,               
        minlength: 3,
        maxlength: 30,
        required: true
    },
    lastNameA: {
        type: String,               
        minlength: 3,
        maxlength: 30,
        required: true
    },
    lastNameB: {
        type: String,               
        minlength: 3,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 16,
        required: true
    },
    gender: {
        type: String,
        enum: ["female", "male", "lgbt", "common", "neuter"],
        required: true
    }
}, {
    timestamp: true
})


const Parent = mongoose.model("parents", parentSchema)


module.exports = Parent
