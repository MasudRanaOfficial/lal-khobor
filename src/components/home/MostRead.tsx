import { mostReadData } from "@/utils/api";
import Link from "next/link";

const MostRead = async () => {
  const data = await mostReadData();

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-5">সর্বাধিক পঠিত</h2>

      <div className="flex flex-col gap-4">
        {data.map((mostRead) => (
          <Link
            key={mostRead.id}
            href={`/news/${mostRead.id}`}
            className="group flex items-start gap-3"
          >
            <span className="text-2xl font-serif font-bold text-red-700 leading-none shrink-0 w-6 text-right tabular-nums">
              {mostRead.rank}
            </span>

            <h3 className="font-semibold text-sm leading-snug text-gray-900 group-hover:text-red-700 transition-colors">
              {mostRead.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MostRead;
