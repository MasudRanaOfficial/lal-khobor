import { Article } from "@/types/newstypes";
import Image from "next/image";
import OnCard from "../cards/OnCard";

interface MainNewsProps {
  news: Article[];
}

const MainNews = ({ news }: MainNewsProps) => {
  if (!news || news.length === 0) {
    return null;
  }

  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-4">
      {/* Left Column: Featured News Card */}
      <div className="card bg-base-100 border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <figure className="relative w-full aspect-16/10 overflow-hidden bg-gray-100">
          <Image
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt || firstNews.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
        <div className="p-5 flex flex-col gap-2">
          <p className="text-red-700 text-xs font-semibold">
            {firstNews.category}
          </p>
          <h2 className="text-xl font-bold leading-snug hover:text-red-700 cursor-pointer transition-colors">
            {firstNews.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3">
            {firstNews.description}
          </p>
        </div>
      </div>

      {/* Right Column: Other News List */}
      <div className="card bg-base-100 border border-gray-200 rounded-xl p-5 shadow-xs divide-y divide-gray-200 flex flex-col justify-between">
        {otherNews.slice(0,4).map((item) => (
          <OnCard key={item.id} otherNew={item} />
        ))}
      </div>
    </div>
  );
};

export default MainNews;
