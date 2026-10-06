import React from "react";
import Link from "next/link";

interface LiveCoverageNoticeProps {
  id: string;
  sourceUrl: string;
}

export const LiveCoverageNotice: React.FC<LiveCoverageNoticeProps> = ({
  sourceUrl,
}) => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
        {/* লাইভ ব্যাজ */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          লাইভ কাভারেজ
        </div>

        {/* রেডিও আইকন */}
        <div className="mx-auto w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="2" />
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
          </svg>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-3">
          এটি একটি লাইভ আপডেট প্রতিবেদন
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          এই প্রতিবেদনটিতে সরাসরি আপডেট প্রকাশিত হচ্ছে, যার কারণে সম্পূর্ণ
          কন্টেন্টটি সাধারণ আর্টিকেল আকারে এখানে প্রদর্শন করা সম্ভব নয়। সর্বশেষ
          তথ্য জানতে মূল লাইভ পাতায় চোখ রাখুন।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* এক্সটার্নাল লাইভ লিংক */}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            <span>বিবিসি বাংলায় লাইভ পড়ুন</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          {/* হোমে ফেরার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-5 py-3 rounded-xl transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>হোমে ফিরুন</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LiveCoverageNotice;
