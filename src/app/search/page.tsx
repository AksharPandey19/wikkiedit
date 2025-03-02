"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Link, Search } from "lucide-react";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between border-b border-gray-800">
      {/* Logo */}
      <h1 className="text-2xl font-bold cursor-pointer"><Link href="/">WikiEdit</Link></h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button type="submit">
          <Search className="text-gray-400 hover:text-white transition ml-2" size={18} />
        </button>
      </form>

    </header>
  );
}


export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);
  const router = useRouter(); // Now router is defined

  return (
    <div className="min-h-screen bg-black text-white p-6">
          <Header/>
          <br></br>
      <h1 className="text-3xl font-bold mb-4">Search results for <span className="text-gray-300">&quot;{query}&quot;</span></h1>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((article) => (
            <div key={article.id} className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition"             onClick={() => router.push(`/article/${article.id}`)}
          >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-400">{article.description || "View article about " + article.title}...</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </div>
  );
}
