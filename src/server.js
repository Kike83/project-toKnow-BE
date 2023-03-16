const express = require("express")
const app = express()
const cors = require("cors")
const routerSchool = require("./routes/school.route")
const routerGroup = require("./routes/group.route")
const routerTeacher = require("./routes/teacher.route")
const routerStudent = require("./routes/student.route")
const routerParent = require("./routes/parent.route")
const routerUser = require("./routes/user.route")
const routerAuth = require("./routes/auth.route")
const routerAnnouncement = require("./routes/announcement.route")
const routerReply = require("./routes/replies.route")

app.use(cors())
app.use(express.json())

app.use("/school", routerSchool)
app.use("/group", routerGroup)
app.use("/teacher", routerTeacher)
app.use("/student", routerStudent)
app.use("/parent", routerParent)
app.use("/user", routerUser)
app.use("/login", routerAuth)
app.use("/announcement", routerAnnouncement)
app.use("/reply", routerReply)

app.get("/", (resquest, response) => {
    response.json({
        message: "Bienvenidos a toKnow. Endpoint de Home"
    })
})

module.exports = app