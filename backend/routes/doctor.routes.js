const { Router } = require("express")

const { get_users } = require("../controllers/doctor.controllers")
const router = Router()

router.get('/get_users', get_users)

module.exports = router