"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Edit } from "lucide-react";

export default function Header({ articleId }: { articleId?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between border-b border-gray-800">
      {/* Logo */}
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link href="/">WikiEdit</Link>
      </h1>

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

      {/* Edit Article Button (Only visible on article page) */}
      {articleId && (
        <button
          onClick={() => router.push(`/edit/${articleId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Edit size={18} className="mr-2" />
          Edit Article
        </button>
      )}
    </header>
  );
}
