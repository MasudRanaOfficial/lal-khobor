import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleDetail, BodyBlock } from "@/types/newsarticletypes";
import LiveCoverageNotice from "@/components/others/LiveCoverageNotice";
import BookmarkButton from "@/components/news/BookmarkButton";
import { getPrankArticle } from "@/data/prankNews";

const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

const formatBengaliDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    const day = toBengaliNumber(date.getDate());
    const month = months[date.getMonth()];
    const year = toBengaliNumber(date.getFullYear());
    return `${day} ${month}, ${year}`;
  } catch {
    return isoString;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }> | { newsId: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const newsId = resolvedParams.newsId;

  // প্রাঙ্ক নিউজের জন্য মেটাডাটা
  const prank = getPrankArticle(newsId);
  if (prank) {
    return {
      title: `${prank.title} | লাল খবর`,
      description: "জীবন যৌবন সব হারিয়ে পথের ভিখারি আজ এক সময়ের কুটিপতি। বিস্তারিত পড়ুন লাল খবরে...",
      openGraph: {
        title: prank.title,
        description: "জীবন যৌবন সব হারিয়ে পথের ভিখারি আজ এক সময়ের কুটিপতি। বিস্তারিত পড়ুন লাল খবরে...",
        images: prank.imageUrl ? [prank.imageUrl] : [],
      },
    };
  }

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${newsId}`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    if (data.success && data.data) {
      return {
        title: `${data.data.title} | লাল খবর`,
        description: data.data.title,
        openGraph: {
          title: data.data.title,
          images: data.data.imageUrl ? [data.data.imageUrl] : [],
        },
      };
    }
  } catch {
    // সাইলেন্ট ফেইল
  }

  return {
    title: "সংবাদ বিস্তারিত | লাল খবর",
  };
}

const NewsDetailPages = async ({
  params,
}: {
  params: Promise<{ newsId: string }> | { newsId: string };
}) => {
  const resolvedParams = await params;
  const newsId = resolvedParams.newsId;

  // প্রাঙ্ক বা কাস্টম নিউজ হ্যান্ডলিং
  const prankArticle = getPrankArticle(newsId);
  let liveUrl: string | null = null;
  let isUnsupported = false;
  let newsArticle: ArticleDetail | null = prankArticle;

  if (!newsArticle) {
    let data: {
      success?: boolean;
      data?: ArticleDetail;
      error?: { code?: string; message?: string };
    } | null = null;

    try {
      const res = await fetch(
        `https://news-api-v2.vercel.app/api/article/${newsId}`,
        { next: { revalidate: 60 } },
      );
      data = await res.json();
    } catch {
      notFound();
    }

    if (data && !data.success && data.error?.code === "UNSUPPORTED_CONTENT") {
      isUnsupported = true;
      const liveUrlMatch = data.error.message?.match(/https?:\/\/[^\s]+/);
      liveUrl = liveUrlMatch
        ? liveUrlMatch[0]
        : `https://www.bbc.com/bengali/live/${newsId}`;
    } else if (!data || !data.success || !data.data) {
      notFound();
    } else {
      newsArticle = data.data;
    }
  }

  if (isUnsupported && liveUrl) {
    return <LiveCoverageNotice id={newsId} sourceUrl={liveUrl} />;
  }

  if (!newsArticle) {
    notFound();
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        {/* টপিকস */}
        {newsArticle.topics && newsArticle.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {newsArticle.topics.slice(0, 3).map((topic) => (
              <span
                key={topic.id}
                className="bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {topic.name}
              </span>
            ))}
          </div>
        )}

        {/* শিরোনাম */}
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight mb-4">
          {newsArticle.title}
        </h1>

        {/* মেটা ইনফো */}
        <div className="flex flex-wrap items-center justify-between border-y border-gray-100 py-3 mb-6 text-sm text-gray-600 gap-2">
          <div className="flex items-center gap-2 font-medium">
            {newsArticle.byline && newsArticle.byline.length > 0 ? (
              <span>
                {newsArticle.byline.map((b) => b.name).join(", ")}
                {newsArticle.byline[0]?.role && (
                  <span className="text-gray-400 font-normal">
                    {" "}
                    | {newsArticle.byline[0].role}
                  </span>
                )}
              </span>
            ) : (
              <span>{newsArticle.source || "বিবিসি বাংলা"}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {newsArticle.firstPublished && (
              <time
                dateTime={newsArticle.firstPublished}
                className="text-xs sm:text-sm text-gray-500"
              >
                {formatBengaliDate(newsArticle.firstPublished)}
              </time>
            )}
            <BookmarkButton
              article={{
                id: newsId,
                title: newsArticle.title,
                imageUrl: newsArticle.imageUrl,
                category: newsArticle.topics?.[0]?.name || null,
                source: newsArticle.source || null,
                firstPublished: newsArticle.firstPublished,
              }}
            />
          </div>
        </div>

        {/* ফিচার ইমেজ (একবারই রেন্ডার হবে) */}
        {newsArticle.imageUrl && (
          <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={newsArticle.imageUrl}
              alt={newsArticle.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* বডি ব্লকস (ডুপ্লিকেট ছবি বাদ দেওয়ার ফিল্টার সহ) */}
        <div className="space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
          {newsArticle.body && newsArticle.body.length > 0 ? (
            newsArticle.body.map((block: BodyBlock, index: number) => {
              if (block.type === "subheading") {
                return (
                  <h2
                    key={index}
                    className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mt-8 mb-3"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "image") {
                // উপরের ফিচার ইমেজের সাথে মিল থাকলে ভেতরে দ্বিতীয়বার দেখাবে না
                if (block.url === newsArticle.imageUrl || index === 0) {
                  return null;
                }

                return (
                  <figure key={index} className="my-6">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={block.url}
                        alt={block.altText || "ছবি"}
                        fill
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-xs sm:text-sm text-gray-500 mt-2 px-1">
                        {block.caption}
                        {block.copyrightHolder && (
                          <span className="block text-[11px] text-gray-400 mt-0.5">
                            ছবি স্বত্ব: {block.copyrightHolder}
                          </span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (block.type === "text") {
                return (
                  <p key={index} className="whitespace-pre-line">
                    {block.text}
                  </p>
                );
              }

              return null;
            })
          ) : (
            <p className="whitespace-pre-line">{newsArticle.text}</p>
          )}
        </div>

        {/* ট্যাগস */}
        {newsArticle.tags && newsArticle.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              সম্পর্কিত বিষয়:
            </h3>
            <div className="flex flex-wrap gap-2">
              {newsArticle.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* সোর্স লিঙ্ক */}
        {newsArticle.sourceUrl && (
          <div className="mt-8 text-right">
            <Link
              href={newsArticle.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-600 hover:underline"
            >
              মূল প্রতিবেদন পড়ুন ({newsArticle.source}) &rarr;
            </Link>
          </div>
        )}
      </article>
    </main>
  );
};

export default NewsDetailPages;
