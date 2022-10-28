
const mongoose = require("mongoose")


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true
    },
    grade: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    generationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'generations'
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