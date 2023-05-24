const { Router } = require("express");
const router = Router();

const { register, login } = require("../controllers/auth.controllers")

router.post("/login", login);
router.post("/register", register);

module.exports = router;