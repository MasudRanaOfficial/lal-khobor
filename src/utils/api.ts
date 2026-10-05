import type { Nav } from "@/types/newstypes";

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