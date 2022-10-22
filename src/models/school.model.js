const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
    nameResponsable: {
        type: String,                  
        minlength: 3,
        maxlength: 30,
        required: true
    },
    // email -> pendiente regex validar .edu
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 10,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    generationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'generations',
        required: true,
    }],

    // 2nda pantalla de Registro
        // no llevan require
    nameSchool: {
        type: String,
        minlength: 5,
    },
    cct: {
        type: String,
        minlength: 3,
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 10,
    },
    addressStreet: {
        type: String,
        minlength: 3,
    },
    addressNumber: {
        type: Number,
        minlength: 1,
    },
    postalCode: {
        type: Number,
        minlength: 2,
    },
    city: {
        type: String,
        minlength: 2
    },
    state: {
        type: String,
        minlength: 2
    }
}, {
    timestamp: true
})


const School = mongoose.model('schools', schoolSchema)


module.exports = School
