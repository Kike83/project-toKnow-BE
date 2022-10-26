require('dotenv').config()

const mongoose = require("mongoose")

const server = require("./src/server")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env



mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
.then(() => {                       
    console.log("La BD está conectada")

    server.listen(8080, (request, response) => {
        console.log("El servidor está encendido");
    })
})
.catch((err) => {
    console.log("Error al conectar a la BD", err)
})
