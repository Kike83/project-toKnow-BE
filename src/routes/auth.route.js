const express = require("express")
const router = express.Router()

const { loginAdmin, loginTeacher } = require("../usecases/auth.usecase")


// endpoint - LoginAdmin
router.post("/", async (request, response) => {
    const { email, password, role } = request.body
    try{    
        const token = await loginAdmin(email, password, role) 
        response.json({
            success: true,
            message: "Se inició sesión correctamente",
            token
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        })
    }
})


// endpoint loginTeacher
router.post("/teacher", async (request, response) => {
    try{
        const {email, password, role} = request.body
        const token = await loginTeacher(email, password, role)

        response.json({
            success: true,
            message: "Se ha iniciado sesión correctamente",
            token
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        })
    }
})



module.exports = router