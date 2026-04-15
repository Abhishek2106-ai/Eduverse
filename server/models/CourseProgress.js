const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const User = require("../models/User") // ✅ NEW

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if subsection exists
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find course progress
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    }

    // Already completed
    if (courseProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({ error: "Subsection already completed" })
    }

    // Add completed video
    courseProgress.completedVideos.push(subsectionId)
    await courseProgress.save()

    // =========================
    // 🎮 GAMIFICATION SYSTEM
    // =========================

    // Increase XP
    await User.findByIdAndUpdate(userId, {
      $inc: { xp: 10 },
    })

    const user = await User.findById(userId)

    // Level logic
    let newLevel = "Beginner"
    if (user.xp > 300) newLevel = "Pro"
    else if (user.xp > 100) newLevel = "Intermediate"

    // Badge logic
    if (user.xp > 200 && !user.badges.includes("Fast Learner")) {
      user.badges.push("Fast Learner")
    }

    // Save updates
    user.level = newLevel
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Course progress updated + XP added 🚀",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}