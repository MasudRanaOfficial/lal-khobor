import type { MostReadArticle, Nav, NewsItem, NewsSection } from "@/types/newstypes";

export const navData = async (): Promise<Nav[]> => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return Array.isArray(data?.data) ? data.data : [];
};


export const marqueeData = async (): Promise<NewsItem[]> => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  if(!res.ok) {
    return [];
  }

  const data = await res.json();

  return Array.isArray(data?.data) ? data.data : [];
}


export const homePageData = async (): Promise<NewsSection[]> => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return Array.isArray(data?.data) ? data.data : [];
};


export const mostReadData = async (): Promise<MostReadArticle[]> => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return Array.isArray(data?.data) ? data.data : [];
};