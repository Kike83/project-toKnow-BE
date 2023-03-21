const User = require("../models/user.model");
const TeacherUser = require("../models/teacher.model")
const ParentUser = require("../models/parent.model")
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib")


// login Admin
async function loginAdmin(email, password) {
    const userFound = await User.findOne({email}).populate('school')
    console.log("imprimiendo userFound:", userFound)

    if(!userFound) throw new Error('Credenciales invalidas', 400)

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new Error('Credenciales invalidas', 400)

    return jwt.sign({id: userFound._id, role: userFound.role, schoolId: userFound.school?._id})
}


// login Teacher
async function loginTeacher(email, password) {
    const teacherFound = await TeacherUser.findOne({email})

    if(!teacherFound) throw new Error("Credenciales invalidas para usuario de profesor", 400)

    const isValidPassword = await bcrypt.compare(password, teacherFound.password)

    if(!isValidPassword) throw new Error("Credenciales invalidas para usuario de profesor", 400)

    return jwt.sign({id: teacherFound._id, role: teacherFound.role, schoolId: teacherFound.school?._id})
}


// login Parent
async function loginParent(email, password) {
    const parentFound = await ParentUser.findOne({email})

    if(!parentFound) throw new Error("credenciales no validas para usuario de tutor-papá", 400)

    const isValidPassword = await bcrypt.compare(password, parentFound.password)

    if(!isValidPassword) throw new Error("Credenciales no validas para usuario de tutor-papá", 400)

    return jwt.sign({id: parentFound._id, role: parentFound.role, schoolId: parentFound.school?._id})
}

module.exports = { 
    // login, 
    loginAdmin,
    loginTeacher,
    loginParent
}

