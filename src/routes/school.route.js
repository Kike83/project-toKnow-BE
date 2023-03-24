const express = require("express")
const router = express.Router()

const jwt = require("../lib/jwt.lib")

const access = require("../middlewares/userRoles.middleware")
const auth = require("../middlewares/auth.middleware")

const {getAll, getById, create, update, remove} = require ("../usecases/school.usecase.js")

router.use(auth)


// endpoint 1 - getAll
router.get ("/", access('admin'), async (request, response)=>{
    try{
        const schools = await getAll()
        response.json({
            success:true,
            data:{
                schools
            }
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success:false,
            message: error.message
        })
    }
})


// endpoint 2 - getById
router.get ("/:id", access('admin'), async (request, response)=>{
    const {id} = request.params
    try{
        const school = await getById(id)
        response.json({
            success:true,
            data:{
                school
            }
        })
    }catch(error){
        response.status(error.status || 404)
        response.json({
            success:false,
            message: error.message
        })
    }
})


// endpoint 3 - Post
// con populate
router.post("/", access('admin'), async (request, response) => {
    try{
        const userCurrent = request.userCurrent
        const roleCurrent = request.roleCurrent

        const school = await create(request.body, userCurrent)

        const newToken = jwt.sign({id: userCurrent, role: roleCurrent, schoolId: school._id})

        console.log("imprimiendo schoolid:", school._id)

        response.status(201)
        response.json({
            success: true, 
            data: {
                school,
                newToken
            }
        })
    }catch(error){
        response.status(error.status || 400)
        response.json({
            success : false,
            message: error.message
        })
    }
})


// endpoint 4 - Update
router.patch ("/:id", access('admin'), async (request, response)=>{
    const {id} = request.params
    try{
        const school = await update(id, request.body)
        response.json({
            success: true,
            data:{
                school
            }
        })

    }catch(error){
        response.status(error.status || 400)
        response.json({
            success : false,
            message: error.message
        })
    }
})


// endpoint 5 - Delete
router.delete ("/:id", access('admin'), async (request, response)=>{
    const {id} = request.params
    try{
        const post = await remove(id)
        response.status(200)
        response.json({
            success:true,
            message: "School was deleted"
        })

    }catch(error){
        response.status(error.status || 500)
        response.json({
            success : false,
            message: error.message
        })
    }
})


module.exports = router