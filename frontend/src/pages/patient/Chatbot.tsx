import { useState } from "react";
import { chatbotReply } from "../../api/ai";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am MediMate AI 🤖. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Send to backend
    try {
      const res = await chatbotReply({ message: input });
      const botResponse = res.data.reply;

      setMessages([
        ...newMessages,
        { sender: "bot", text: botResponse }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, I couldn’t process that." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">MediMate AI Chatbot</h1>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-3 max-w-xs rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white border"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
          placeholder="Type your message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
