const express = require("express")
const router = express.Router()

const access = require("../middlewares/userRoles.middleware")
const auth = require("../middlewares/auth.middleware")

const { getAll, getById,     create, update, remove } = require("../usecases/teacher.usecase")

router.use(auth)



// endpoints 1 - getAll
router.get("/", access('admin'), async (request, response) => {
    try {
        const teachers = await getAll();      
        response.json({
            success: true,
            data:{
                teachers
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


// endpoint 2 - getById
router.get("/:id", access('admin'), async (request, response) => {
    const { id } = request.params
    try{
        const teacherById = await getById(id);
        response.json({
            success: true,
            data:{
                teacherById
            }
        })
    }catch (error) {    
        console.log("imprimiendo error", error)
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        })
    }
})



// endpoint - 3 - Create
router.post("/", access('admin'), async (request, response) => {
    try{
        const teacherCreated = await create( request.body )
        
        response.status(201)

        response.json({
            success: true,
            data:{
                teacherCreated
            }
        })

    }catch (error) {    
        console.log("imprimiendo error", error)
        
        response.status(error.status || 500)
        
        response.json({
            success: false,
            message: error.message
        })
    }
})



// endpoint 4 - Patch
router.patch("/:id", access('admin'), async (request, response) => {
    try {
        const teacherPatched = await update(request.params.id, request.body)
        response.json({
        success: true,
        data: {
            teacherPatched
        }
        })
    
    } catch(error) {
        console.log("imprimiendo error", error)

        response.status(error.status || 404)
        response.json({
        success: false,
        message: error.message
        })
    }
    })

// endpoint 5 - Delete
router.delete("/:id", access('admin'), async (request, response) => {
    try {
        await remove(request.params.id)
        response.json({
        success: true,
        message: "Teacher deleted"
        })
    } catch(error) {
        console.log("imprimiendo error", error)

        response.status(error.status || 400)
        
        response.json({
        success: false,
        message: error.message
        })
    }
    })




module.exports = router
