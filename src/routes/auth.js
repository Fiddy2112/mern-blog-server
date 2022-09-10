const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const userController = require("../controllers/UserController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", verifyToken, userController.userLogged);

module.exports = router;
