const express = require("express")
const router = express.Router()

const { create, getById, getAll } = require("../usecases/user.usecase")


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


// endpoint 2 - getById
router.get("/:id", async (request, response) =>{
    const { id } = request.params
    try{
      const userById = await getById(id)
      response.json ({ 
        success: true,
        data:{
          userById
        }
      })
    } catch(error){
      console.log("imprimiendo error", error)
      response.status(error.status || 500)
      response.json({
        success:false,
          message: error.message
      })
    }
  })


// endpoint 3 - getAll
router.get ("/", async (request, response) => {
  try{
    const userAll = await getAll()
    response.json({
      success: true,
      data:{
        userAll
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