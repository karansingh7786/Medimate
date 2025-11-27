import { useState } from "react";
import { predictDisease, checkFakeMedicine, chatbotReply } from "../../api/ai";

export default function AIFeatures() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const runDiseaseCheck = async () => {
    const res = await predictDisease({ symptoms: input });
    setResult(res.data.prediction);
  };

  const runFakeMedicine = async () => {
    const res = await checkFakeMedicine({ name: input });
    setResult(res.data.status);
  };

  const runChatbot = async () => {
    const res = await chatbotReply({ message: input });
    setResult(res.data.reply);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Assistance</h1>

      <textarea
        className="input"
        placeholder="Type symptoms or medicine name"
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button className="btn" onClick={runDiseaseCheck}>Predict Disease</button>
        <button className="btn" onClick={runFakeMedicine}>Fake Medicine Check</button>
        <button className="btn" onClick={runChatbot}>Chatbot</button>
      </div>

      <p className="mt-4 p-3 bg-gray-100 rounded">{result}</p>
    </div>
  );
}
