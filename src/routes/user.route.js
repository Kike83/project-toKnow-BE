
const express = require("express")
const router = express.Router()

const { getAll, getById, create } = require("../usecases/user.usecase")




// endpoint 1 - getAll
router.get("/", async (request, response) => {
    
    try{
        const users = await getAll()
    
        response.json({
            succes: true,
            data: {
                users
            }
        })

    }catch(error) {
        response.status(error.status || 500)
        response.json({
            succes: false,
            message: error.message
        })
    }
    
})


// endpoint 2 - getById
router.get("/:id", async (request, response) => {
    const { id } = request.params
    try{
        const userById = await getById(id)
        response.json({
            succes: true,
            data: {
                userById
            }
        })

    }catch(error) {
        console.log("imprimiendo error")
        response.status(error.status || 500)
        response.json({
            succes: false,
            message: error.message
        })
    }
    
})





// endpoint 3 - Create for Signup
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
    
})



module.exports = router
