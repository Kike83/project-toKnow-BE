const express = require("express")
const {createParent, getAll, getById, updateParent, removeParent} = require("../usecases/parent.usecase") 

const router = express.Router() 


//Post
router.post("/createparent", async (request, response) => {
    
    try {
      const createdParent = await createParent(request.body)
      response.json({
        success: true,
        data: { createdParent }
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
        const parents = await getAll()

        response.json({
            success: true,
            data:{
                parents
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
        const parent = await getById( id )
        response.json ({ 
            success: true,
            data:{
                parent
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
router.patch("/parent/:id", async (request, response) => {
  try {
    const { id } = request.params
    const parent = await updateParent(id, request.body)

    response.json({
      success: true,
      data: {
        parent
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
router.delete("/parent/:id", async (request, response) => {
  try {
    const { id } = request.params
    const post = await removeParent(id)

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