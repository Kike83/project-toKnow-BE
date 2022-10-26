const express = require("express");
const app = express();
const routerSchool = require("./routes/school.route")

app.use(express.json())


// Middleware - ruta /students
const routerStudent = require("./routes/student.route")
app.use("/students", routerStudent)


// Middleware - ruta /teachers
const routerTeacher = require("./routes/teacher.route")
app.use("/teachers", routerTeacher)
app.use("/school", routerSchool)



app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
