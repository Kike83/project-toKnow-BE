const express = require("express")
const {getAll, getById, createschool, deleteschool, updateschool, deleteSchool} = require ("../usecases/school.usecase")
const router = express.Router()
// const auth = require("../middlewares/auth.middleware")

router.get ("/", async (request, response)=>{

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

router.get ("/:id", async (request, response)=>{
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

router.school("/", async (request, response) => {
    try{
        const school = await create(request.body)
        response.status(201)
        response.json({
            success: true, 
            data: {
                school
            }
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            success : false,
            message: error.message
        })
    }
})

router.delete ("/:id", async (request, response)=>{
    const {id} = request.params
    try{
        const post = await delete(id)
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

router.patch ("/:id", async (request, response)=>{
    const {id} = request.params
    try{
        const school = await updateSchool(id, request.body)
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

module.exports = router