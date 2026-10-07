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
      setErrorMessage(
        "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSigninWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
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
        <form onSubmit={onSubmit} className="space-y-4 mb-4">
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
        {/* Login With Google */}
        <button
          onClick={handleSigninWithGoogle}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
