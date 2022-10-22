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
        enum: ["female", "male", "lgbt", "common", "neuter"],
        required: true
    },
    dateOfBirth: {
        type: Number,
        required: true
    },
    bio: {
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
    matricula: {
        type: String,               
        minlength: 3,
        maxlength: 30,
        required: true
    },
    materia: {
        type: String,
        enum: ["Matemáticas", "Español", "Ciencias Naturales", "Ciencias Sociales", "Educación Física", "Inglés", "Artes"],
        required: true
    },
    grade: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    group: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true
    },
}, {
    timestamp: true
})


const Teacher = mongoose.model("teachers", teacherSchema)


module.exports = Teacher
