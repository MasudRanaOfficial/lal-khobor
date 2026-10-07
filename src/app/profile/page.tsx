"use client";

import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Bookmark,
  Camera,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Mail,
  Pencil,
  ShieldCheck,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SavedArticle {
  _id: string;
  articleId: string;
  title: string;
  imageUrl?: string | null;
  category?: string | null;
  source?: string | null;
  publishedAt?: string | null;
  createdAt: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState<"profile" | "bookmarks">(
    "profile",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // বুকমার্ক ডাটা
  const [bookmarks, setBookmarks] = useState<SavedArticle[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  // বুকমার্ক লোড ফাংশন
  const fetchBookmarks = React.useCallback(async () => {
    if (!user) return;
    setBookmarksLoading(true);
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBookmarks(data.data);
      }
    } catch {
      toast.error("সংরক্ষিত সংবাদ লোড করা যায়নি");
    } finally {
      setBookmarksLoading(false);
    }
  }, [user]);

  // প্রাথমিক বুকমার্ক লোড (ট্যাব ব্যাজ দেখানোর জন্য)
  useEffect(() => {
    let isMounted = true;
    const loadInitialBookmarks = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data)) {
          setBookmarks(data.data);
        }
      } catch {
        // সাইলেন্ট ফেইল
      }
    };
    void loadInitialBookmarks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTabChange = (tab: "profile" | "bookmarks") => {
    setActiveTab(tab);
    if (tab === "bookmarks") {
      void fetchBookmarks();
    }
  };

  // বুকমার্ক রিমুভ করার হ্যান্ডলার
  const handleRemoveBookmark = async (articleId: string, title: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, title }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookmarks((prev) => prev.filter((b) => b.articleId !== articleId));
        toast.success("বুকমার্ক থেকে সরানো হয়েছে");
      } else {
        toast.error("রিমুভ করা যায়নি");
      }
    } catch {
      toast.error("সার্ভার ত্রুটি");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const image = String(formData.get("image") || "").trim();

    try {
      const { error } = await authClient.updateUser({
        name: name || user?.name || "",
        image: image || user?.image || undefined,
      });

      if (error) {
        const msg = error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে।";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        const msg = "প্রোফাইল সফলভাবে আপডেট করা হয়েছে!";
        setSuccessMessage(msg);
        toast.success(msg);
        setIsEditing(false);
        router.refresh();
      }
    } catch {
      const msg = "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
      router.push("/");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    }
  };

  // লোডিং অবস্থা
  if (isPending || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col items-center animate-pulse">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
          <div className="w-48 h-6 bg-gray-200 rounded mb-2" />
          <div className="w-64 h-4 bg-gray-100 rounded mb-6" />
          <div className="w-32 h-10 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ব্যাক লিঙ্ক */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          হোমপেজে ফিরে যান
        </Link>
      </div>

      {/* প্রধান কন্টেইনার কার্ড */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-6">
        {/* ব্যানার */}
        <div className="h-32 sm:h-36 bg-linear-to-r from-red-800 via-red-700 to-red-900 relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* প্রোফাইল তথ্য অংশ */}
        <div className="px-6 sm:px-10 pb-6 relative">
          {/* অ্যাভাটার */}
          <div className="flex justify-between items-end -mt-14 sm:-mt-16 mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-red-700 text-white flex items-center justify-center font-serif text-3xl font-bold relative z-10 shrink-0">
              {user.image ? (
                <Image
                  alt={user.name || "Profile"}
                  src={user.image}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span>
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </span>
              )}
            </div>

            {/* এডিট বাটন (শুধু প্রোফাইল ট্যাবে) */}
            {activeTab === "profile" && (
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    বাতিল করুন
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    এডিট প্রোফাইল
                  </>
                )}
              </button>
            )}
          </div>

          {/* নাম ও ইমেইল */}
          <div className="space-y-1 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                সদস্য
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* ট্যাব নেভিগেশন */}
          <div className="flex border-b border-gray-200 gap-6">
            <button
              type="button"
              onClick={() => handleTabChange("profile")}
              className={`pb-3 font-semibold text-sm sm:text-base border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "profile"
                  ? "border-red-700 text-red-700"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <User className="w-4 h-4" />
              প্রোফাইল তথ্য
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("bookmarks")}
              className={`pb-3 font-semibold text-sm sm:text-base border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "bookmarks"
                  ? "border-red-700 text-red-700"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              সংরক্ষিত সংবাদ
              {bookmarks.length > 0 && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                  {bookmarks.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ট্যাব ১: প্রোফাইল তথ্য */}
        {activeTab === "profile" && (
          <div className="px-6 sm:px-10 pb-8">
            {/* নোটিফিকেশন মেসেজ */}
            {successMessage && (
              <div className="mb-6 flex items-center gap-2.5 p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* এডিট ফর্ম */}
            {isEditing && (
              <form
                onSubmit={handleUpdateProfile}
                className="mb-6 p-5 sm:p-6 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-4 animate-in fade-in duration-200"
              >
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Pencil className="w-4 h-4 text-red-700" />
                  তথ্য পরিবর্তন করুন
                </h3>

                {/* নাম ইনপুট */}
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    নাম
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      defaultValue={user?.name || ""}
                      placeholder="আপনার নাম"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
                    />
                  </div>
                </div>

                {/* ইমেজ URL ইনপুট */}
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="image"
                    className="text-sm font-semibold text-gray-700"
                  >
                    প্রোফাইল ছবির লিংক (URL)
                  </label>
                  <div className="relative">
                    <Camera className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="image"
                      name="image"
                      type="url"
                      defaultValue={user?.image || ""}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
                    />
                  </div>
                </div>

                {/* বাটন গ্রুপ */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-700 hover:bg-red-800 active:bg-red-900 disabled:opacity-60 text-white font-medium py-2.5 px-5 rounded-xl shadow-xs transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? "আপডেট হচ্ছে..." : "সংরক্ষণ করুন"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-xl border border-gray-300 transition-colors cursor-pointer text-sm"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            )}

            {/* অতিরিক্ত তথ্য ও অ্যাকশন */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-gray-500">
                অ্যাকাউন্ট আইডি:{" "}
                <span className="font-mono text-gray-700">{user?.id}</span>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-100"
              >
                <LogOut className="w-4 h-4" />
                সাইন আউট করুন
              </button>
            </div>
          </div>
        )}

        {/* ট্যাব ২: সংরক্ষিত সংবাদ (Bookmarks) */}
        {activeTab === "bookmarks" && (
          <div className="px-6 sm:px-10 pb-8 pt-4">
            {bookmarksLoading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bookmark className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  কোনো সংরক্ষিত সংবাদ নেই
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  পছন্দের কোনো খবর পরবর্তীতে পড়ার জন্য বুকমার্ক আইকনে ক্লিক করে
                  এখানে সেভ করে রাখুন।
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline"
                >
                  সংবাদ পড়ুন &rarr;
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {bookmarks.map((item) => (
                  <div
                    key={item._id}
                    className="py-4 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {item.imageUrl ? (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                          <Bookmark className="w-6 h-6" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {item.category && (
                          <span className="text-xs font-semibold text-red-700">
                            {item.category}
                          </span>
                        )}
                        <Link
                          href={`/news/${item.articleId}`}
                          className="block text-sm sm:text-base font-bold text-gray-900 hover:text-red-700 transition-colors line-clamp-2 mt-0.5"
                        >
                          {item.title}
                        </Link>
                        {item.source && (
                          <span className="text-xs text-gray-400 mt-1 block">
                            {item.source}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        href={`/news/${item.articleId}`}
                        title="পড়ুন"
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveBookmark(item.articleId, item.title)
                        }
                        title="মুছে ফেলুন"
                        className="p-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
