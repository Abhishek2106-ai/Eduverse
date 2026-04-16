import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // 🎤 Speech Recognition
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = recognition ? new recognition() : null;

  if (mic) {
    mic.continuous = false;
    mic.lang = "en-US";
  }

  const startListening = () => {
    if (!mic) return alert("Speech not supported");
    mic.start();

    mic.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setMessage(text);
      sendMessage(text);
    };
  };

  // 📚 Get course context
  const courseName = localStorage.getItem("lastCourse") || "";

  // Load chat
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("aiChat"));
    if (saved) setChat(saved);
  }, []);

  // Save chat
  useEffect(() => {
    localStorage.setItem("aiChat", JSON.stringify(chat));
  }, [chat]);

  // Smart auto-scroll
  useEffect(() => {
    const container = chatRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;

    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  // Typing effect
  const typeEffect = (text, id) => {
    let i = 0;
    const interval = setInterval(() => {
      setChat((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, text: text.slice(0, i + 1) }
            : msg
        )
      );

      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);
  };

  const sendMessage = async (customMsg) => {
    const msg = customMsg || message;
    if (!msg.trim()) return;

    const finalMsg = courseName
      ? `Course: ${courseName}. ${msg}`
      : msg;

    setChat((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: msg },
    ]);
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        "https://your-backend-name.onrender.com",
        { message: finalMsg },
        { timeout: 60000 }
      );

      const botId = Date.now() + 1;

      setChat((prev) => [
        ...prev,
        { id: botId, type: "bot", text: "" },
      ]);

      typeEffect(res.data.reply || "No response", botId);
    } catch {
      setChat((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "bot",
          text: "❌ AI not responding",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-yellow-400 px-4 py-3 rounded-full z-[9999]"
      >
        🤖
      </button>

      {open && (
        <div
          className={`fixed ${
            fullscreen
              ? "top-0 left-0 w-full h-full"
              : "bottom-20 right-6 w-80 h-[500px]"
          } bg-richblack-800 text-white p-4 rounded-xl shadow-2xl z-[9999]`}
        >
          {/* HEADER */}
          <div className="flex justify-between mb-2">
            <h2>Eduverse AI</h2>

            <div className="flex gap-2">
              <button onClick={() => setFullscreen(!fullscreen)}>🖥️</button>
              <button onClick={() => setOpen(false)}>❌</button>
            </div>
          </div>

          {/* CHAT */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto flex flex-col gap-2 p-2 bg-richblack-700 rounded custom-scroll"
            style={{ height: "70%" }}
          >
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded max-w-[80%] ${
                  msg.type === "user"
                    ? "bg-yellow-400 text-black self-end"
                    : "bg-gray-600 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p>🤖 Thinking...</p>}
          </div>

          {/* QUICK BUTTONS */}
          <div className="flex gap-2 mt-2 flex-wrap text-xs">
            <button onClick={() => sendMessage("Explain this course")} className="bg-gray-700 px-2 py-1 rounded">Explain</button>
            <button onClick={() => sendMessage("Generate quiz")} className="bg-gray-700 px-2 py-1 rounded">Quiz</button>
            <button onClick={() => sendMessage("Summarize")} className="bg-gray-700 px-2 py-1 rounded">Summary</button>
          </div>

          {/* INPUT */}
          <div className="mt-2 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 text-black rounded"
              placeholder="Ask anything..."
            />

            {/* 🎤 MIC BUTTON */}
            <button
              onClick={startListening}
              className="bg-blue-500 px-2 rounded"
            >
              🎤
            </button>

            <button
              onClick={() => sendMessage()}
              className="bg-yellow-400 px-3 rounded text-black"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}