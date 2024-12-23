"use client";

import React, { useState, useEffect } from "react";

interface Article {
  title: string;
  key: string;
  authors: { name: string }[];
}

const categories = ["faith", "community", "literature", "science"];

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("faith");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        `/api/articles?category=${category}&page=${page}`
      );
      const data = await res.json();
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.total / 10));
    };

    fetchArticles();
  }, [category, page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>

      <div className="mb-4">
        <label className="text-sm font-medium">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="ml-2 px-4 py-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.key} className="p-4 border-b">
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm">
              By: {article.authors.map((a) => a.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleList;
