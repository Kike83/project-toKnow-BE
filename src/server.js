const createError = require ('http-errors')
const express = require("express")
const routerSchool = require("./routes/school.route")
const app = express()

// Middleware
app.use(express.json())

app.use("/school", routerSchool)


app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
