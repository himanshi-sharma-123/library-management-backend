const express = require("express");
const router = express.Router();
const User = require("../model/user");
const usersController = require("../controllers/user-controller");

router.post("/", usersController.login);
router.post("/signup", usersController.signup);

module.exports = router;
