const express = require("express")
const router = express.Router()

const access = require("../middlewares/userRoles.middleware")
const auth = require("../middlewares/auth.middleware")

const { getAll, getById, create, update, remove } = require("../usecases/student.usecase")

router.use(auth)



// endpoint 1 - getAll
router.get("/", access('admin', 'teacher', 'parent'), async (request, response) => {
    try {
        const students = await getAll();      
        response.json({
            success: true,
            data:{
                students
            }
        })
    } catch (error) {
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
        const studentById = await getById(id);
        response.json({
            success: true,
            data:{
                studentById
            }
        })
    }catch (error) {    
        console.log("imprimiendo error que hicimos nosotros", error)
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        })
    }
})



// endpoint 3 - Post
router.post("/", access('admin'), async (request, response) => {
    try{
        const studentCreated = await create( request.body );
        response.status(201)
        response.json({
            success: true,
            data:{
                studentCreated
            }
        })
    }catch (error) {    
        console.log("imprimiendo error que nosotros hicimos", error)
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
        const studentPatched = await update(request.params.id, request.body)
        response.json({
        success: true,
        data: {
            studentPatched
        }
        })
    
    } catch(error) {
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
        message: "Student deleted"
        })
    } catch(error) {
        response.status(error.status || 400)
        response.json({
        success: false,
        message: error.message
        })
    }
    })




module.exports = router
