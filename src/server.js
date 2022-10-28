const express = require("express");
const routerParent = require("./routes/parent.route")

const app = express();

//middleware
app.use(express.json())


//Middleware de ruta

app.use("/parent", routerParent)


//Endpoint de home
app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
