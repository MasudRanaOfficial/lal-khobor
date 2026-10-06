import { Article } from "@/types/newstypes";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  news: Article;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="card bg-base-100 border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-full">
        <figure className="relative w-full aspect-16/10 overflow-hidden bg-gray-100">
          <Image
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>

        <div className="p-4 flex flex-col gap-2 grow">
          {news.category && (
            <p className="text-red-700 text-xs font-semibold">
              {news.category}
            </p>
          )}
          <h2 className="text-base font-bold leading-snug line-clamp-2 hover:text-red-700 cursor-pointer transition-colors">
            {news.title}
          </h2>
          {news.description && (
            <p className="text-gray-600 text-xs line-clamp-2 mt-auto">
              {news.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
