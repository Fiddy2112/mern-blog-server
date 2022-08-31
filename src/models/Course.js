const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  videoId: { type: String, required: true },
  level: { type: String },
  slug: { type: String, slug: "name", unique: true },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("courses", CourseSchema);
