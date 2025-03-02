"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/articles?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError("Article not found.");
          } else {
            setTitle(data.title);
            setContent(data.content);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching article.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`/api/articles?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      // ✅ Redirect with success message
      router.push(`/?success=${encodeURIComponent("Article updated successfully")}`);
    } else {
      setError("Failed to update article.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href={`/articles/${id}`} className="text-blue-400 hover:underline">
        ← Back to Article
      </Link>

      <h1 className="text-3xl font-bold mt-6">Edit Article</h1>

      {loading ? (
        <p className="mt-4 text-gray-400">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg h-40"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
