const express = require("express");

const router = express.Router();

const { register, login } = require("../controller/userController");
const { getTokenLogin, validateUser } = require('../middleware/auth');

router.post("/register", register);
router.post("/login", login, getTokenLogin)

module.exports = router;