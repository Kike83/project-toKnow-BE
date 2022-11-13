const mongoose = require("mongoose")


const parentSchema = new mongoose.Schema({
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
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    phone: {
        type: Number
    },
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }]
}, {
    timestamp: true
})


const Parent = mongoose.model("parents", parentSchema)


module.exports = Parent
