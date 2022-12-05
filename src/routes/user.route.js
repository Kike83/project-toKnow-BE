const express = require("express")
const router = express.Router()

const { create, getAll } = require("../usecases/user.usecase")


// endpoint 1 - Create para SignUp
router.post("/", async (request, response) => {
    try{
        const userCreated = await create(request.body)
        response.status(201)
        response.json({
            succes: true,
            data: {
                userCreated
            }
        })
    }catch(error) {
        console.log("imprimiendo error", error)
        response.status(error.status || 500)
        response.json({
            succes: false,
            message: error.message
        })
    }
});


// endpoint 2 - getAll para populate
/*
solo para pruebas 
pruebas en Insomnia con populate school

pero no queda abierto, ni con middleware de 'admin'

porque aún así el 'admin' también podría consultar todos los usuarios de la BD


router.get ("/", async (request, response)=>{
    try{
        const users = await getAll()
        response.json({
            success:true,
            data:{
                users
            }
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success:false,
            message: error.message
        })
    }
})
*/




module.exports = router