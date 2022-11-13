const mongoose = require("mongoose")


const teacherSchema = new mongoose.Schema({
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
    gender: {
        type: String
    },
    dateOfBirth: {
        type: Number
    },
    bio: {
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
    matricula: {
        type: String               
    },
    tipoProfesor: {
        type: String,
        enum: ["Matematicas", "Español", "Ciencias Naturales", "Ciencias Sociales", "Educacion Fisica", "Ingles", "Artes"]
    },
    grade: {
        type: Number
    },
    groupId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }],
}, {
    timestamp: true
})


const Teacher = mongoose.model("teachers", teacherSchema)


module.exports = Teacher
