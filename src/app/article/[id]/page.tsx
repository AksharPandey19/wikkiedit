"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "./Header";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/articles?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setArticle(null);
          } else {
            setArticle(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching article:", err);
          setArticle(null);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      {/* Pass article ID to Header */}
      <Header articleId={id} />
      <br />
      <div className="min-h-screen bg-black text-white p-6">
        <Link href="/" className="text-blue-400 hover:underline">
          ← Back to Search
        </Link>

        {loading ? (
          <p className="mt-6 text-gray-400">Loading...</p>
        ) : article ? (
          <div className="mt-6">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <p className="mt-4 text-gray-300">{article.content}</p>
          </div>
        ) : (
          <p className="mt-6 text-gray-400">Article not found.</p>
        )}
      </div>
    </>
  );
}
