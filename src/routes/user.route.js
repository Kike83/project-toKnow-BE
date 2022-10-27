const express = require("express")
const router = express.Router()
const { getAll, getById } = require("../usecases/user.usecase")



router.get("/", async (request,response) => {
    try{
        const users = await getAll()
        response.json({
            success: true,
            data: {
                users
            }
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        })
    }    
})

router.get("/:id", async (request,response) => {
    const { id } = request.params
    try{
        const user = await getById(id)
        response.json({
            success: true,
            data: {
                users
            }
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