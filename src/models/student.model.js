const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
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
    matricula: {
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
    parentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parents',
        required: true
    }]
}, {
    timestamp: true
})




const Student = mongoose.model("students", studentSchema)


module.exports = Student
