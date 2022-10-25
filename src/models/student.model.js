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
        maxlength: 30
    },
    gender: {
        type: String,
        enum: ["female", "male", "lgbt", "common", "neuter"]
    },
    dateOfBirth: {
        type: Number
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
    parentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parents'
    }]
}, {
    timestamp: true
})




const Student = mongoose.model("students", studentSchema)


module.exports = Student
