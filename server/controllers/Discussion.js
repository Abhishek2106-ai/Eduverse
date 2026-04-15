const Discussion = require("../models/Discussion");

// Add question
exports.addQuestion = async (req, res) => {
  try {
    const { courseId, question } = req.body;

    const newQ = await Discussion.create({
      courseId,
      userId: req.user.id,
      question,
    });

    res.json({ success: true, data: newQ });
  } catch {
    res.status(500).json({ success: false });
  }
};

// Get questions
exports.getQuestions = async (req, res) => {
  try {
    const { courseId } = req.query;

    const data = await Discussion.find({ courseId }).sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false });
  }
};