const User = require("../models/user.model");
const TeacherUser = require("../models/teacher.model")
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib")


// login Admin
async function loginAdmin(email, password) {
    const userFound = await User.findOne({email})

    if(!userFound) throw new Error('Credenciales invalidas', 400)

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new Error('Credenciales invalidas', 400)

    return jwt.sign({id: userFound._id, role: userFound.role})
}


// login Teacher
async function loginTeacher(email, password) {
    const teacherFound = await TeacherUser.findOne({email})

    if(!teacherFound) throw new Error("Credenciales invalidas para usuario de profesor", 400)

    const isValidPassword = await bcrypt.compare(password, teacherFound.password)

    if(!isValidPassword) throw new Error("Credenciales invalidas para usuario de profesor", 400)

    return jwt.sign({id: teacherFound._id, role: teacherFound.role})
}


module.exports = { 
    // login, 
    loginAdmin,
    loginTeacher
}

