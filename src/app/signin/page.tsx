"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      } else if (data) {
        router.push("/");
      }
    } catch {
      setErrorMessage("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] py-10 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* শিরোনাম */}
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 font-serif mb-1.5 text-center">
          সাইন ইন
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
        </p>

        {/* ফর্ম কন্টেইনার */}
        <form onSubmit={onSubmit} className="space-y-4">
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
              placeholder="আপনার পাসওয়ার্ড দিন"
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-700 transition-all"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* সাইন ইন বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-red-700 hover:bg-red-800 active:bg-red-900 disabled:opacity-60 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg shadow-xs transition-all duration-150 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>

          {/* সাইন আপ লিঙ্ক */}
          <p className="text-center text-sm text-gray-600 pt-2">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="text-red-700 hover:underline font-medium"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
