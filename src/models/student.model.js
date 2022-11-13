const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
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
    matricula: {
        type: String
    },
    gender: {
        type: String
    },
    dateOfBirth: {
        type: Number
    },
    grade: {
        type: Number
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
