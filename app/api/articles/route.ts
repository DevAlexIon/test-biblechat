import { NextRequest, NextResponse } from "next/server";

const fetchArticles = async (category: string, page: number) => {
  const offset = (page - 1) * 10;
  const url = `https://openlibrary.org/subjects/${category}.json?limit=10&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    articles: data.works || [],
    total: data.work_count || 0,
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "faith";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const data = await fetchArticles(category, page);
  return NextResponse.json(data);
}
