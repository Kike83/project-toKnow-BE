const express = require("express")
const router = express.Router()

const access = require("../middlewares/userRoles.middleware")
const auth = require("../middlewares/auth.middleware")

const { getAll, getById, create, update, remove } = require("../usecases/replies.usecase")

router.use(auth)


// endpoint 1 - getAll
router.get("/", access('admin', 'teacher', 'parent'), async (request, response) => {
    try {
        const reply = await getAll();
        response.json({
            success: true,
            data: {
                reply
            }
        })
    }catch (error){
      console.log("imprimiendo error", error)
      response.status(error.status || 500)
      response.json({
        success: false,
        message: error.message
      })
    }
})


// endpoint 2 - getById
router.get("/:id", access('admin', 'teacher', 'parent'), async (request, response) => {
  const { id } = request.params
  try{
    const replyById = await getById(id)
    response.json({
      success: true,
      data: {
        replyById
      }
    })
  }catch (error){
    console.log("imprimiendo error:", error)
    response.status(error.status || 500)
    response.json({
      success: false,
      message: error.message
    })
  }
})


// enpoint 3 - Post
router.post("/", access('admin', 'teacher', 'parent'), async (request, response) => {
  try {
    const userCurrent = request.userCurrent

    const replyCreated = await create(request.body, userCurrent);

    response.status(201)

    response.json({
      success: true,
      data:{
        replyCreated
      }
    })
  }catch (error){
    console.log("imprimiendo error:", error)
    response.status(error.status || 500)
    response.json({
      success: false,
      message: error.message
    })
  }
})


// endpoint 4 - Patch
router.patch("/:id", access('admin', 'teacher', 'parent'), async (request, response) => {
  const { id } = request.params
  try{
    const replyPatched = await update(id, request.body)
    response.json({
      success: true,
      data: {
        replyPatched
      }
    })
  }catch (error){
    console.log("imprimiendo error:", error)
    response.status(error.status || 404)
    response.json({
      success: false,
      message: error.message
    })
  }
})


// endpoint 5 - Delete
router.delete("/:id", access('admin', 'teacher'), async (request, response) => {
  const { id } = request.params
  try{
    const replyToDelete = await remove(id)
    response.status(200)
    response.json({
      success: true,
      message: "Se eliminó el reply seleccionado"
    })
  }catch (error){
    console.log("imprimiendo el error:", error)
    response.status(error.status || 400)
    response.json({
      success: false,
      message: error.message
    })
  }
})


module.exports = router