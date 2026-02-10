export default function ChatMessage({ role, text }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl px-4 py-2 rounded-2xl ${
          role === "user"
            ? "bg-purple-600 text-white"
            : "bg-white/10 text-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
