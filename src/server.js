const express = require("express");
const routerGroup = require("./routes/group.route")

const app = express();

//middleware
app.use(express.json())


//Middleware de ruta //la ruta es /group + la ruta en group.route (que dejamos como / )
//aquí irá cada ruta
app.use("/group", routerGroup)


//Endpoint de home
app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
