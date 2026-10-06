import type { NewsItem } from "@/types/newstypes";
import { marqueeData } from "@/utils/api";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const data: NewsItem[] = await marqueeData();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-red-700 text-white border-t border-red-800 text-xs sm:text-sm select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* "সর্বশেষ" লেবেল - ফ্লেক্স সঙ্কোচন রোধে shrink-0 এবং z-index */}
        <div className="bg-red-900/90 text-white font-bold py-1.5 px-3 sm:px-4 shrink-0 flex items-center gap-1.5 z-10 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          সর্বশেষ
        </div>

        {/* স্ক্রলিং টেক্সট এরিয়া */}
        <div className="flex-1 overflow-hidden">
          <MarqueeText
            className="py-1.5 flex items-center"
            direction="right"
            duration={20}
            pauseOnHover={true}
          >
            {data.map((d) => (
              <span key={d.id} className="inline-flex items-center">
                <Link
                  href={`/news/${d.id}`}
                  className="hover:underline transition-all duration-150 decoration-white/70 underline-offset-4"
                >
                  {d.title}
                </Link>
                <span className="mx-4 text-red-300 opacity-70">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
