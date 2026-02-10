import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t border-white/10 bg-[#0f0f14]">
      <div className="max-w-3xl mx-auto flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Ask anything..."
          className="flex-1 bg-transparent outline-none text-gray-200 px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-full"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
