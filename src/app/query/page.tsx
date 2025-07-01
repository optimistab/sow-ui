"use client";

import { useState } from "react";

export default function QueryPage() {
  const [query, setQuery] = useState("");
//   const [results, setResults] = useState<{ score: string; content: string }[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setStatus("Please enter a query.");
      return;
    }

    setLoading(true);
    setStatus("");
    setResults([]);

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      console.log("Response:", res);

      const data = await res.json();
      console.log("Data:", data);
      if (data.results && data.results.length > 0) {
        console.log("Results:", data.results);
        setResults(data.results);
      } else {
        setStatus("No results found.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      setStatus("An error occurred while querying.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Query Customer Requirements</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your requirement..."
        className="w-full border border-gray-300 px-4 py-2 mb-4 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {status && <p className="mt-4 text-red-600">{status}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Top Matches:</h2>
          <ul className="space-y-4">
            {results.map((res, idx) => (
              <li
                key={idx}
                className="p-4 border whitespace-pre-wrap"
              >
              
                <p>{res}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
