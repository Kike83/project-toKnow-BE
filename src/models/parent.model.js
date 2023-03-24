const mongoose = require("mongoose")


const parentSchema = new mongoose.Schema({
    name: {
        type: String,               
        minlength: 2,
        maxlength: 20,
        required: true
    },
    lastNameA: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    lastNameB: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true             
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
    },
    phone: {
        type: Number
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'parent'],
        default: ['teacher']
    },
    image: {
        type: String
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    }
}, {
    timestamp: true
})


const Parent = mongoose.model("parents", parentSchema)


module.exports = Parent
