const express = require("express");
const routerParent = require("./routes/parent.route")

const app = express();

//middleware
app.use(express.json())


//Middleware de ruta //la ruta es /group + la ruta en group.route (que dejamos como / )
//aquí irá cada ruta

app.use("/parent", routerParent)


//Endpoint de home
app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
