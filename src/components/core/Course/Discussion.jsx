import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Discussion() {
  const { courseId } = useParams();
  const [question, setQuestion] = useState("");
  const [list, setList] = useState([]);

  // Load questions
  const fetchQuestions = async () => {
    const res = await axios.get(
      `https://your-backend-name.onrender.com/api/v1/discussion/get?courseId=${courseId}`
    );
    setList(res.data.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const addQuestion = async () => {
    if (!question) return;

    await axios.post("https://your-backend-name.onrender.com/api/v1/discussion/add", {
      courseId,
      question,
    });

    setQuestion("");
    fetchQuestions();
  };

  return (
    <div className="mt-6 bg-richblack-800 p-4 rounded">
      <h2 className="text-lg text-yellow-300">💬 Discussion</h2>

      <div className="flex gap-2 mt-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 text-black rounded"
          placeholder="Ask something..."
        />
        <button onClick={addQuestion} className="bg-yellow-400 px-3 rounded text-black">
          Ask
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {list.map((q) => (
          <div key={q._id} className="bg-gray-700 p-2 rounded">
            👉 {q.question}
          </div>
        ))}
      </div>
    </div>
  );
}