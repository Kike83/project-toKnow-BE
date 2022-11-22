
const mongoose = require("mongoose")


const groupSchema = new mongoose.Schema({
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
    year: {
        type: String,
        enum: ["2022-2023", "2023-2024"],
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    },
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }],
    teacherId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }]
}, {
    timestamp: true
})


const Group = mongoose.model('groups', groupSchema)


module.exports = Group