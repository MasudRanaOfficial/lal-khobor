"use client";

import { authClient } from "@/lib/auth-client";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BookmarkButtonProps {
  article: {
    id: string;
    title: string;
    imageUrl?: string | null;
    category?: string | null;
    source?: string | null;
    firstPublished?: string | null;
  };
}

const BookmarkButton = ({ article }: BookmarkButtonProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // পেজ লোড হলে চেক করবে আর্টিকেলটি ইতিমধ্যে বুকমার্ক করা আছে কি না
  useEffect(() => {
    if (!session?.user) return;

    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const found = data.data.some(
            (b: { articleId: string }) => b.articleId === article.id,
          );
          setIsBookmarked(found);
        }
      })
      .catch(() => {});
  }, [session?.user, article.id]);

  const handleToggleBookmark = async () => {
    if (!session?.user) {
      toast.error("বুকমার্ক করতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId: article.id,
          title: article.title,
          imageUrl: article.imageUrl,
          category: article.category,
          source: article.source,
          publishedAt: article.firstPublished,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsBookmarked(data.bookmarked);
        if (data.bookmarked) {
          toast.success(data.message || "সংবাদটি বুকমার্ক করা হয়েছে");
        } else {
          toast(data.message || "বুকমার্ক থেকে সরানো হয়েছে", { icon: "🗑️" });
        }
      } else {
        toast.error(data.error || "সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleBookmark}
      disabled={loading}
      title={isBookmarked ? "বুকমার্ক থেকে সরান" : "বুকমার্ক করুন"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer border active:scale-95 disabled:opacity-50 ${
        isBookmarked
          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-700"
      }`}
    >
      <Bookmark
        className={`w-4 h-4 transition-transform duration-150 ${
          isBookmarked ? "fill-red-700 text-red-700 scale-110" : "text-gray-500"
        }`}
      />
      <span>{isBookmarked ? "সংরক্ষিত" : "সংরক্ষণ করুন"}</span>
    </button>
  );
};

export default BookmarkButton;

