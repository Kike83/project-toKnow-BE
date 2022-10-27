const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        require: true,
        minlength: 3
    },
    name: {
        type: String,
        minlength: 3
    }
})

const User = mongoose.model("users", userSchema)
module.exports = User