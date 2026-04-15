import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("// Write code here");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: 63, // JavaScript
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOutput(res.data.stdout || res.data.stderr);
    } catch {
      setOutput("Error running code");
    }
  };

  return (
    <div className="p-4 bg-black text-white rounded">
      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button onClick={runCode} 
className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-lg hover:scale-105 transition">
            Run Code
      </button>

      <pre className="mt-2 bg-gray-800 p-2">{output}</pre>
    </div>
  );
}