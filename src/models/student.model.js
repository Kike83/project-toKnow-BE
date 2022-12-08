const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
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
    matricula: {
        type: String
    },
    dateOfBirth: {
        type: Number
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }],
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parents'
    }]
}, {
    timestamp: true
})




const Student = mongoose.model("students", studentSchema)


module.exports = Student
