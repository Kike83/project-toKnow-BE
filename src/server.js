const express = require("express");
const app = express();

app.use(express.json())


// Middleware - ruta /students
const routerStudent = require("./routes/student.route")
app.use("/students", routerStudent)


// Middleware - ruta /teachers
const routerTeacher = require("./routes/teacher.route")
app.use("/teachers", routerTeacher)



app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
