const express = require("express")
const router = express.Router() 

const {createGroup, getAll, getById, updateGroup, removeGroup} = require("../usecases/group.usecase") 

const authorizationMiddleware = require("../middlewares/auth.middleware")
router.use(authorizationMiddleware)



//Post
router.post("/creategroup", async (request, response) => {
    
    try {
      const createdGroup = await createGroup(request.body)
      response.json({
        success: true,
        data: { createdGroup }
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: error.message
      })
    }
  })


// ruta es /group (por lo que especificamos en el middleware de server)
 // sólo le sumamos la "/" (opcional al escribir la ruta en insomnia)
 //Get
router.get("/", async (request, response) => {
    try{
        const groups = await getAll(request.body)

        response.json({
            success: true,
            data:{
                groups
            }
        })
    }catch(err) {
            response.status(400)
            response.json({
                success: false,
                message: err.message
            })
        
    }
})

//GetById
// ruta groups/:id
router.get("/:id", async (request, response) =>{
    const { id } = request.params
    try{
        const group = await getById( id )
        response.json ({ 
            success: true,
            data:{
                group
            }
        })
    } catch(err){
        response.status(404)
        response.json({
            success:false,
            message: err.message
        })
    }
})

// 

//Update
router.patch("/update/:id", async (request, response) => {
  try {
    const { id } = request.params
    const post = await updateGroup(id, request.body)

    response.json({
      success: true,
      data: {
        post
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
})

//Delete
router.delete("/remove/:id", async (request, response) => {
  try {
    const { id } = request.params
    const post = await removeGroup(id)

    response.json({
      success: true,
      data: {
        post
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
})


module.exports = router