import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(false);

  // Load history from localStorage on start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setHistory(saved);
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const sendMessage = async (text) => {
  if (!text.trim()) return;

  const userMsg = { role: "user", text };
  const thinkingMsg = { role: "bot", text: "Thinking..." };

  // ✅ Dono ek saath add honge (no duplicate)
  setMessages((prev) => [...prev, userMsg, thinkingMsg]);
  setHistory((prev) => [...new Set([text, ...prev])]);

  try {
    const res = await fetch("https://gemini-clone-xxn6.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    // Replace "Thinking..." with real reply
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: "bot", text: data.reply };
      return updated;
    });

  } catch {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: "bot", text: "Error getting response." };
      return updated;
    });
  }
};



  return (
    <div className="flex h-screen bg-[#0f0f14] text-white">
      <Sidebar history={history} onSelect={sendMessage} />

      <div className="flex-1 flex flex-col">
        {/* Welcome Text */}
       
{messages.length === 0 && (
  <div className="flex-1 flex flex-col items-center justify-start pt-4 text-center px-6 ">
    <h1 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text leading-tight">
      Hello Karan, Ask me Anything
    </h1>
    <p className="text-gray-400 mt-2 max-w-xl">
      Ask questions, get help with code, or explore ideas.
    </p>
  </div>
)}

 

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} text={msg.text} />
          ))}
        </div>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
