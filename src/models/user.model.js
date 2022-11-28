const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'parent'],
        default: ['teacher']
    }
})



module.exports = mongoose.model("users", userSchema)