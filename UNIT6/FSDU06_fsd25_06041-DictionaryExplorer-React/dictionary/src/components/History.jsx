export default function History({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Recent Searches</h3>
      <ul className="space-y-1">
        {history.map((word, i) => (
          <li
            key={i}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(word)}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}
