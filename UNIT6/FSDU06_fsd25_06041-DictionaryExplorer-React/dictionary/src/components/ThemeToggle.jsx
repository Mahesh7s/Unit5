export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
