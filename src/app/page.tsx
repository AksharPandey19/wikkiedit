"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "./logo.svg";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");

  const [showMessage, setShowMessage] = useState(!!successMessage);

  useEffect(() => {
    if (showMessage) {
      // Hide the success message after 3 seconds
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
    

      {/* Header */}
      <header className="w-full flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">WikiEdit</h1>
        </div>
        <button
          onClick={() => router.push("/create-article")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create Article
        </button>
      </header>
      {showMessage && (
  <div className="bg-green-700 text-white p-3 rounded-lg mb-4 mt-4">
    {successMessage}
  </div>
)}


      {/* Logo and About Section */}
      <div className="flex flex-col items-center mt-8">
        <Image src={logo} alt="WikiEdit Logo" width={150} height={150} />
        <h1 className="text-3xl font-bold mt-2">WikiEdit</h1>
        <p className="text-gray-400">A simple and open-source clone of Wikipedia.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mt-6 w-80">
        <form onSubmit={handleSearch} className="flex items-center bg-gray-800 px-5 py-2 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
          />
        
        </form>
        <br></br>
        <div className="mt-6 flex justify-center w-full">
          <button
            onClick={() => window.open("https://htmlproject-seven.vercel.app", "_blank")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold"
          >
            Visit My Website
          </button>
        </div>
      </div>
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
  ©️ Copyright 2025-25 Akshar Pandey
</p>
    </div>
  );
}
