const express = require("express")
const router = express.Router()

const { login } = require("../usecases/user.usecase")


// endpoint 1 - LogIn
router.post("/", async (request, response) => {

    const { email, password } = request.body

    try{    
        const token = await login(email, password) 

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



// 3.-
// exportar
module.exports = router