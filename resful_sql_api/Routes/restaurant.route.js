const express = require("express");
const router = express.Router()
const { getAll,getByid,createdRes,deleteById,UpdateById } = require('../controller/restaurant.controller')

router.get("/restaurant",getAll)
router.get("/restaurant/:id",getByid)
router.post("/restaurant",createdRes)
router.delete("/restaurant/:id",deleteById)
router.put("/restaurant/:id",UpdateById)
module.exports = router