const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "llama3",
prompt: `
You are an AI tutor for an EdTech platform.
Explain clearly, simply, and step-by-step.

User question: ${message}
`,
        stream: false,
      },
      {
        timeout: 60000, 
      }
    );

    return res.json({
      success: true,
      reply: response.data.response || "No response",
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "AI failed",
      error: error.message,
    });
  }
});

module.exports = router;