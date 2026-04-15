const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  courseId: String,
  userId: String,
  question: String,
  answers: [String],
});

module.exports = mongoose.model("Discussion", discussionSchema);