import type { NewsItem } from "@/types/newstypes";
import { marqueeData } from "@/utils/api";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const data: NewsItem[] = await marqueeData();

  return (
    <div className="bg-red-700 text-white">
      <div className="flex max-w-7xl mx-auto">
        <div className="bg-red-800 py-1 px-3 font-bold">সর্বশেষ</div>
        <MarqueeText className="py-1" direction="right" duration={10}>
          {Array.isArray(data) &&
            data.map((d) => (
              <span key={d.id}>
                <Link href={d.link}
                className="hover:underline"
                >{d.title}</Link>
                <span className="mx-5">•</span>
              </span>
            ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
