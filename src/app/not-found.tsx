"use client";

import { ArrowLeft, Home, Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-xl w-full text-center">
        {/* টপ ব্যাজ আইকন */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-50 border border-red-100 text-red-700 mb-6 shadow-xs">
          <Newspaper className="w-10 h-10 text-red-700 animate-pulse" />
        </div>

        {/* বড় ৪০৪ নাম্বার */}
        <div className="relative mb-3">
          <span className="text-8xl sm:text-9xl font-serif font-black text-red-700 tracking-tight leading-none select-none drop-shadow-xs">
            ৪০৪
          </span>
        </div>

        {/* শিরোনাম */}
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 mb-3">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* বিবরণ */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
          আপনি যে খবর বা পাতাটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পরিবর্তন করা
          হয়েছে অথবা লিংকটি ভুল ছিল।
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 active:scale-95 text-white font-medium py-3 px-6 rounded-xl shadow-xs transition-all duration-150 text-sm sm:text-base"
          >
            <Home className="w-4 h-4" />
            মূল পাতায় ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 px-6 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            পূর্ববর্তী পাতা
          </button>
        </div>

        {/* জনপ্রিয় ক্যাটাগরি লিঙ্কস */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            জনপ্রিয় বিভাগসমূহ
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { title: "রাজনীতি", href: "/category/politics" },
              { title: "বিশ্ব", href: "/category/world" },
              { title: "অর্থনীতি", href: "/category/economy" },
              { title: "স্বাস্থ্য", href: "/category/health" },
              { title: "খেলা", href: "/category/sports" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-xs font-medium text-gray-600 hover:text-red-700 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
