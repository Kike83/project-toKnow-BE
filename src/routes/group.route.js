const express = require("express")
const router = express.Router() 

const { getAll, getById, update, create, remove } = require("../usecases/group.usecase") 

const authorizationMiddleware = require("../middlewares/auth.middleware")
router.use(authorizationMiddleware)



// endpoint 1 - getAll
router.get("/", async (request, response) => {
  try{
    const groups = await getAll();
    response.json({
      success: true,
      data:{
            groups
        }
    })
  }catch(error) {
    console.log("imprimiendo error", error)

    response.status(error.status || 500)
    
    response.json({
      success: false,
      message: error.message
    })
  }
})



// endpoint 2 - getById
router.get("/:id", async (request, response) =>{
  const { id } = request.params
  try{
    const groupById = await getById(id)
    
    response.json ({ 
      success: true,
      data:{
        groupById
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



// endpoint 3 - Post
router.post("/", async (request, response) => {
  try {
    const groupCreated = await create(request.body)
    
    response.status(201)

    response.json({
      success: true,
      data: { 
        groupCreated 
      }
    })

  } catch (error) {
    console.log("imprimiendo error", error)

    response.status(error.status || 500)
    
    response.json({
      success: false,
      message: error.message
    })
  }
})



// endpoint 4 - Update
router.patch("/:id", async (request, response) => {
  try {
    const groupPatched = await update(request.params.id, request.body)

    response.json({
      success: true,
      data: {
        groupPatched
      }
    })
  } catch (error) {
    console.log("imprimiendo error", error)
    
    response.status(error.status || 404)

    response.json({
      success: false,
      message: error.message
    })
  }
})



// endpoint 5 - Delete
router.delete("/:id", async (request, response) => {
  try {
    await remove(request.params.id)

    response.json({
      success: true,
      message: "Se eliminó el grupo seleccionado"
    })

  } catch (error) {
    console.log("imprimiendo error", error)

    response.status(error.status || 400)
    
    response.json({
      success: false,
      message: error.message
    })
  }
})


module.exports = router