import { useRef } from "react";

export default function SearchBar({ query, setQuery, setSuggestions, onSearch }) {
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }
      fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(value)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.slice(0, 8)))
        .catch(() => setSuggestions([]));
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type a word and press Enter..."
      className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
    />
  );
}
