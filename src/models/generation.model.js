const mongoose = require("mongoose")


const generationSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools',
        
    },
    groupId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        
    }]
}, {
    timestamp: true
})


const Generation = mongoose.model('generations', generationSchema)


module.exports = Generation
