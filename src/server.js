const express = require("express");
const app = express();
const routerSchool = require("./routes/school.route")
const routerTeacher = require("./routes/teacher.route")
const routerStudent = require("./routes/student.route")
const routerUser = require("./routes/user.route")


app.use(express.json())


app.use("/school", routerSchool)
app.use("/teachers", routerTeacher)
app.use("/students", routerStudent)
app.use("/users", routerUser)


app.get("/", (resquest, response) => {

    response.json({
    message: "Bienvenidos a toKnow. Endpoint de Home"
})
})


module.exports = app
