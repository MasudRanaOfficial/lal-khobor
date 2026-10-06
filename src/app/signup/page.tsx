"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: String(formValues.name),
      email: String(formValues.email),
      password: String(formValues.password),
      image: formValues.image ? String(formValues.image) : undefined,
      callbackURL: "/",
    });

    setLoading(false);

    if (data) {
      router.push("/");
    }

    if (error) {
      setErrorMessage(
        error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] py-10 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* শিরোনাম */}
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 font-serif mb-1.5 text-center">
          সাইন আপ
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          নতুন অ্যাকাউন্ট তৈরি করতে তথ্য দিন
        </p>

        {/* ফর্ম কন্টেইনার */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* নাম */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="আপনার পুরো নাম"
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
            />
          </div>

          {/* ইমেজ */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              প্রোফাইল ছবি (URL)
            </label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg (ঐচ্ছিক)"
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
            />
          </div>

          {/* ইমেইল */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
            />
          </div>

          {/* পাসওয়ার্ড */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-red-700 hover:bg-red-800 active:bg-red-900 disabled:opacity-60 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg shadow-xs transition-all duration-150 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
          </button>

          {/* সাইন ইন লিঙ্ক */}
          <p className="text-center text-sm text-gray-600 pt-2">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="text-red-700 hover:underline font-medium"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
