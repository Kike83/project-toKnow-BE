const express = require("express");
const app = express();
const routerStudent = require("./routes/student.route")
const routerSchool = require("./routes/school.route")
const routerUser = require("./routes/user.route")
const routerTeacher = require("./routes/teacher.route")

app.use(express.json())


// Middleware - ruta /students

app.use("/students", routerStudent)
app.use("/teachers", routerTeacher)
app.use("/schools", routerSchool)
app.use("/users", routerUser)




app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
