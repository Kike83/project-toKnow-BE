const mongoose = require("mongoose")


const generationSchema = new mongoose.Schema({
    year: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools',
        required: true
    },
    groupId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        required: true
    }]
}, {
    timestamp: true
})


const Generation = mongoose.model('generations', generationSchema)


module.exports = Generation
