import MainNews from "@/components/home/MainNews";
import Marquee from "@/components/home/Marquee";
import { homePageData } from "@/utils/api";

export default async function Home() {
  const data = await homePageData();
  const mainNews = data[0]?.articles ?? [];

  return (
    <div>
      <Marquee />
      <div className="grid grid-cols-3 max-w-7xl mx-auto">
        {/* News Section */}
        <div className="col-span-2">
          <MainNews news={mainNews} />
        </div>

        {/* Most Read Section */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
