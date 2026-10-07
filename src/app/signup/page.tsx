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

  const handleSigninWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleSigninWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
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
        </form>

        {/* অথবা ডিভাইডার */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-500 font-medium">অথবা</span>
          </div>
        </div>

        {/* সোশ্যাল সাইন আপ বাটন */}
        <div className="grid grid-cols-2 gap-3">
          {/* Login With Google */}
          <button
            type="button"
            onClick={handleSigninWithGoogle}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium border border-gray-300 rounded-lg shadow-2xs transition-all active:scale-98 cursor-pointer"
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
            Google
          </button>

          {/* Login with Github */}
          <button
            type="button"
            onClick={handleSigninWithGithub}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-medium border border-gray-900 rounded-lg shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            <svg
              aria-label="GitHub logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
            GitHub
          </button>
        </div>

        {/* সাইন ইন লিঙ্ক */}
        <p className="text-center text-sm text-gray-600 pt-5">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-red-700 hover:underline font-medium"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
