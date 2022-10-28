const mongoose = require("mongoose")


const teacherSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: ["female", "male", "lgbt", "common", "neuter"]
    },
    dateOfBirth: {
        type: Number
    },
    bio: {
        type: String,               
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 16,
        required: true
    },
    matricula: {
        type: String,               
        minlength: 3,
        maxlength: 30
    },
    materia: {
        type: String,
        enum: ["Matemáticas", "Español", "Ciencias Naturales", "Ciencias Sociales", "Educación Física", "Inglés", "Artes"]
    },
    grade: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
}, {
    timestamp: true
})


const Teacher = mongoose.model("teachers", teacherSchema)


module.exports = Teacher
