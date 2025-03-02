"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleCreateArticle = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and Content cannot be empty!");
      return;
    }

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <div className="w-96 bg-gray-800 p-6 rounded-lg">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 h-32 bg-gray-700 border border-gray-600 text-white rounded-lg"
        />
        <div className="flex justify-between mt-4">
          <button onClick={() => router.push("/")} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleCreateArticle} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}
