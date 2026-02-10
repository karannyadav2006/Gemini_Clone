export default function Sidebar({ history, onSelect }) {
  return (
    <div className="w-72 bg-white/5 border-r border-white/10 p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">Recent Searches</h2>

      <div className="space-y-2 text-sm text-gray-400">
        {history.map((item, i) => (
          <p
            key={i}
            onClick={() => onSelect(item)}
            className="hover:text-white cursor-pointer truncate"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
