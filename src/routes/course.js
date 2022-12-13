const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const courseController = require("../controllers/CourseController");

// Login -> check token -> course
router.get("/learn/:id", verifyToken, courseController.showCourse);
router.put("/:id", verifyToken, courseController.updateCourse);
router.delete("/:id", verifyToken, courseController.deleteCourse);
router.post("/", verifyToken, courseController.create);
router.get("/", verifyToken, courseController.getCourse);

module.exports = router;
