import React from "react";
import ArticleList from "./components/ArticleList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <ArticleList />
    </main>
  );
}
