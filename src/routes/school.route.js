const express = require("express")
const {getAll, getById, create, update, remove} = require ("../usecases/school.usecase.js")
const router = express.Router()


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

router.post("/", async (request, response) => {
    try{
        const school = await create(request.body)
        console.log(request.body)
        response.status(201)
        response.json({
            success: true, 
            data: {
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

router.delete ("/:id", async (request, response)=>{
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

router.patch ("/:id", async (request, response)=>{
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

module.exports = router