// src/pages/Search.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPodcasts } from "../api/podcast"; // we'll add this next
import PodcastCard from "../components/PodcastCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // debounce the search text
  const debouncedQuery = useMemo(() => {
    let handler;
    return {
      set(value, cb) {
        clearTimeout(handler);
        handler = setTimeout(() => cb(value), 400);
      },
    };
  }, []);

  const doSearch = async (q) => {
    if (!q?.trim()) {
      setResults([]);
      setErr("");
      return;
    }
    try {
      setLoading(true);
      setErr("");
      const data = await searchPodcasts(q.trim());
      // expect an array of podcasts
      setResults(Array.isArray(data) ? data : data?.podcasts || []);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // run on first load if ?q= is present
  useEffect(() => {
    if (initialQuery) doSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    debouncedQuery.set(v, (val) => {
      setSearchParams(val ? { q: val } : {});
      doSearch(val);
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Podcasts</h1>
          <p className="text-gray-600">Find creators, shows, and episodes.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={onInputChange}
            placeholder="Search by title, creator, or tags…"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => doSearch(query)}
            className="shrink-0 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* Status / Errors */}
        {err && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}
        {!err && !loading && query && results.length === 0 && (
          <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            No results for “{query}”.
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        {loading ? (
          <div className="py-16 text-center text-gray-600">Loading results…</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pod) => (
              <PodcastCard key={pod._id || pod.id} podcast={pod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
