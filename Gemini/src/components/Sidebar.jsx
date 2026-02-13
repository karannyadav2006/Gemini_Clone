export default function Sidebar({ history, onSelect }) {
  return (
    <div className="w-72 bg-white/5 border-r border-white/10 p-4 hidden md:block">
      <h1 className="text-2xl font-semibold mb-4 text-gray-300 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text leading-tight">Recent Searches</h1>

      <div className="space-y-2 text-sm  ">
        {history.map((item, i) => (
          <p 
            key={i}
            onClick={() => onSelect(item)}
            className=" cursor-pointer truncate text-white text-2xl"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
