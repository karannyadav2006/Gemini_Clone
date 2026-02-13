export default function ChatMessage({ role, text }) {
  const isThinking = text === "Thinking...";

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl px-4 py-2 rounded-2xl ${
          role === "user"
            ? "bg-purple-600 text-white"
            : "bg-white/10 text-gray-200"
        }`}
      >
        {isThinking ? (
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300"></span>
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
