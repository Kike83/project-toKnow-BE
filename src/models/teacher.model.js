const mongoose = require("mongoose")


const teacherSchema = new mongoose.Schema({
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
    dateOfBirth: {
        type: Date
    },
    bio: {
        type: String           
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
    matricula: {
        type: String         
    },
    tipoProfesor: {
        type: String,
        enum: ["titular", "educacion fisica", "ingles"]
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'parent'],
        default: ['teacher']
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }],
}, {
    timestamp: true
})


const Teacher = mongoose.model("teachers", teacherSchema)


module.exports = Teacher
