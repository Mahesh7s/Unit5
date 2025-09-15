import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Suggestions from "./components/Suggestions";
import WordDetails from "./components/WordDetails";
import History from "./components/History";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [wordData, setWordData] = useState(null);
  const [history, setHistory] = useState(() => {
    // load from localStorage
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (word) => {
    setHistory((prev) => {
      const newList = [word, ...prev.filter((w) => w !== word)].slice(0, 5);
      return newList;
    });
  };

  const handleSearch = async (word) => {
    const q = (word || query).trim();
    if (!q) return;

    setError(null);
    setWordData(null);
    setLoading(true);
    setSuggestions([]); // hide suggestions after search

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          q
        )}`
      );
      if (!res.ok) {
        setError(`Word not found: ${q}`);
        return;
      }
      const data = await res.json();
      setWordData(data);
      addToHistory(q);
    } catch {
      setError("Failed to fetch word details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="p-4 flex justify-between items-center shadow">
          <h1 className="text-2xl font-bold">Dictionary Explorer</h1>
          <ThemeToggle dark={dark} setDark={setDark} />
        </header>

        <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <SearchBar
              query={query}
              setQuery={setQuery}
              setSuggestions={setSuggestions}
              onSearch={handleSearch}
            />

            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {wordData && (
              <WordDetails data={wordData} onSynonymClick={handleSearch} />
            )}
          </div>

          <aside className="space-y-4">
            <Suggestions
              query={query}
              suggestions={suggestions}
              onSelect={(word) => {
                setQuery(word);
                handleSearch(word);
              }}
            />
            <History history={history} onSelect={handleSearch} />
          </aside>
        </main>
      </div>
    </div>
  );
}
