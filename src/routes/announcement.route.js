const express = require("express")
const router = express.Router()

const access = require("../middlewares/userRoles.middleware")
const auth = require("../middlewares/auth.middleware")

const { getAll, getById, create, update, remove } = require("../usecases/announcement.usecase")

router.use(auth)


// endpoint 1 - getAll
router.get("/", access('admin', 'teacher', 'parent'), async (request, response) => {
  try {
    const announcement = await getAll();
    response.json({
      success: true,
      data: {
        announcement
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
router.get("/:id", access('admin', 'teacher', 'parent'), async (request, response) => {
  const { id } = request.params
  try {
    const announcementById = await getById(id)
    response.json({
      success: true,
      data: {
        announcementById
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


// endpoint 3 - Post
// con populate
router.post("/", access('admin', 'teacher', 'parent'), async (request, response) => {
  try {
    const userCurrent = request.userCurrent

    const announcementCreated = await create(request.body, userCurrent)

    response.status(201)
    response.json({
      success: true,
      data: {
        announcementCreated
      }
    })
  } catch (error) {
    console.log("imprimiendo error que nosotros hicimos en anuncios", error)
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message
    })
  }
})


// endpoint 4 - Update
router.patch("/:id", access('admin'), async (request, response) => {
  const { id } = request.params
  try {
    const announcementPatched = await update(id, request.body)
    response.json({
      success: true,
      data: {
        announcementPatched
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
router.delete("/:id", access('admin'), async (request, response) => {
  const { id } = request.params
  try {
    const announcementDeleted = await remove(id)
    response.status(200)
    response.json({
      success: true,
      message: "Se eliminó el anuncio seleccionado"
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