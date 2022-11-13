const express = require("express")
const router = express.Router()

const { create } = require("../usecases/user.usecase")


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


module.exports = router