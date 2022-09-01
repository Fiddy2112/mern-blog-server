const Course = require("../models/Course");

class CourseController {
  /**
   * @route POST api/courses
   * @desc Create course
   * @access Private
   */

  async create(req, res) {
    const { name, description, image, videoId, status } = req.body;

    //Simple validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    } else if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "videoId is required",
      });
    }
    try {
      const newCourse = new Course({
        name,
        description,
        image: image
          ? ""
          : `https://i.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAg6bizs3d3bZHQPtx5EQDtKl60A`,
        videoId: videoId || "RUDrYhTV1qc",
        status: status || "TO LEARN",
        user: req.userId,
      });

      // save
      await newCourse.save();

      res.status(200).json({
        success: true,
        message: "Successfully - Happy Learning!",
        course: newCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route GET api/courses
   * @desc Get course
   * @access Private
   */
  async getCourse(req, res) {
    try {
      // find: tim user _id
      // populate: lay ra username tu user(model)
      const courses = await Course.find({ user: req.userId }).populate("user", [
        "username",
      ]);
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route PUT api/courses/:id
   * @desc Update course
   * @access Private
   */
  async updateCourse(req, res) {
    const { name, description, image, videoId, status } = req.body;
    if (!name) {
      res.status(404).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!videoId) {
      res.status(404).json({
        success: false,
        message: "videoId is required",
      });
    }
    try {
      let updatedCourse = {
        name,
        description: description || "",
        image: image
          ? ""
          : `https://i.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAg6bizs3d3bZHQPtx5EQDtKl60A`,
        videoId: videoId,
        status: status || "TO LEARN",
      };

      const courseUpdateCondition = { _id: req.params.id, user: req.userId };

      //A.findOneAndReplace(filter, replacement, options, callback) // executes
      // options : new = true -> return updatedCourse
      updatedCourse = await Course.findOneAndUpdate(
        courseUpdateCondition,
        updatedCourse,
        { new: true }
      );
      // user not authorized to update course or course not found
      if (!updatedCourse) {
        return res.status(401).json({
          success: false,
          message: "Course not found or user not authorized",
        });
      }
      // successfully
      res.status(200).json({
        success: true,
        message: "Successfully updated!",
        course: updatedCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route delete api/courses/:id
   * @desc Delete course
   * @access Private
   */

  async deleteCourse(req, res) {
    try {
      const courseDeleteCondition = { _id: req.params.id, user: req.userId };
      const deleteCourse = await Course.findOneAndDelete(courseDeleteCondition);
      // user not authorized to update course or course not found
      if (!deleteCourse) {
        return res.status(401).json({
          success: false,
          message: "Course not found or user not authorized",
        });
      }

      res.status(200).json({
        success: true,
        message: "Deleted course successfully",
        course: deleteCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new CourseController();
