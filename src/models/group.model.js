
const mongoose = require("mongoose")


const groupSchema = new mongoose.Schema({
    generation: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: true
    },
    grade: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    name: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true
    },
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        
    }],
    teacherId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers',
        
    }]
}, {
    timestamp: true
})


const Group = mongoose.model('groups', groupSchema)


module.exports = Group