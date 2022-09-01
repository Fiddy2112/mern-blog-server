const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  videoId: { type: String, required: true },
  status: { type: String, enum: ["TO LEARN", "LEARNING", "LEARNED"] },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("courses", CourseSchema);
