export default function Suggestions({ query, suggestions, onSelect }) {
  if (!query || suggestions.length === 0) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Suggestions</h3>
      <ul className="space-y-1">
        {suggestions.map((s) => (
          <li
            key={s.word}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(s.word)}
          >
            {s.word}
          </li>
        ))}
      </ul>
    </div>
  );
}
