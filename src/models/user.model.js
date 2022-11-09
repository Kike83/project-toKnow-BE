
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    name: {
        type: String
    }

})



module.exports = mongoose.model("users", userSchema)