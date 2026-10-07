import NewsCard from "@/components/cards/NewsCard";
import { Article } from "@/types/newstypes";

interface CategoryDetailPageProps {
  params: Promise<{ categoryId: string }>;
}

interface CategoryResponse {
  title: string;
  data: Article[];
}

const CategoryDetailPage = async ({ params }: CategoryDetailPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );
  const data = (await res.json()) as CategoryResponse;
  const categoryNews = Array.isArray(data.data) ? data.data : [];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold border-b-2 pb-1 border-red-700 mb-4">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
