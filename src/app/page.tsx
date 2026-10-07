import NewsCard from "@/components/cards/NewsCard";
import MainNews from "@/components/home/MainNews";
import MostRead from "@/components/home/MostRead";
import { Article } from "@/types/newstypes";
import { homePageData } from "@/utils/api";

export default async function Home() {
  const data = await homePageData();

  const validSections = (data ?? []).filter((section) => {
    const hasSocialLinks = section.articles?.some(
      (article: Article) => article.type === "link",
    );
    return !hasSocialLinks;
  });

  const mainNews = validSections[0]?.articles ?? [];
  const otherSections = validSections.slice(1);

  return (
    <div>
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News & Sections (Left 2 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <MainNews news={mainNews} />

            <div className="flex flex-col gap-10">
              {otherSections.map((os) => (
                <section key={os.curationId}>
                  <h2 className="text-lg font-bold border-b-2 pb-1 border-red-700 mb-4">
                    {os.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {os.articles?.map((article) => (
                      <NewsCard key={article.id} news={article} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Sidebar / Most Read Section (Right 1 Column) */}
          <aside className="lg:col-span-1">
            {/* Sidebar widgets or most-read articles go here */}
            <MostRead />
          </aside>
        </div>
      </main>
    </div>
  );
}
