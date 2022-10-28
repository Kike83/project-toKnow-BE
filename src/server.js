const express = require("express");
const app = express();
const routerSchool = require("./routes/school.route")
const routerGroup = require("./routes/group.route")
const routerParent = require("./routes/parent.route")

//middleware
app.use(express.json())


// Middleware - ruta /students
const routerStudent = require("./routes/student.route")
app.use("/students", routerStudent)


// Middleware - ruta /teachers
const routerTeacher = require("./routes/teacher.route")
app.use("/teachers", routerTeacher)
app.use("/school", routerSchool)

//Middleware - ruta /group
app.use("/group", routerGroup)

//Middleware - ruta/parent
app.use("/parent", routerParent)

app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
