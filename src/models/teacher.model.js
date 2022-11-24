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
        enum: ["titular", "educacion fisica", "ingles"]
    },
    grade: {
        type: Number,
        min: 1,
        max: 6,
        required: true
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
