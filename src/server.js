const express = require("express")
const app = express()
const routerSchool = require("./routes/school.route")
const routerGroup = require("./routes/group.route")
const routerTeacher = require("./routes/teacher.route")
const routerParent = require("./routes/parent.route")
const routerStudent = require("./routes/student.route")

app.use(express.json())

app.use("/school", routerSchool)
app.use("/group", routerGroup)
app.use("/teacher", routerTeacher)
app.use("/student", routerStudent)
app.use("/parent", routerParent)

app.get("/", (resquest, response) => {
    response.json({
        message: "Bienvenidos a toKnow. Endpoint de Home"
    })
})

module.exports = app