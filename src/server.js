const express = require("express");
const app = express();

app.use(express.json())


app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
