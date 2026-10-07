"use client";

import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await authClient.signOut();
  };

  // Loading skeleton placeholder
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="hidden sm:block w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {user ? (
        <>
          {/* User Profile Button / Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200 cursor-pointer focus:outline-hidden"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-red-700 text-white flex items-center justify-center font-bold text-sm ring-2 ring-red-100 shadow-xs shrink-0">
              {user.image ? (
                <Image
                  alt={user.name || "User"}
                  src={user.image}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span>
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </span>
              )}
            </div>

            {/* Name & Arrow */}
            <span className="hidden sm:inline-block max-w-27.5 truncate text-xs sm:text-sm font-semibold text-gray-800">
              {user.name}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-500 hidden sm:block transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Floating Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User details */}
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
              </div>

              {/* Action items */}
              <div className="px-2 pt-1.5">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  সাইন আউট
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Logged out state */
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-red-700 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-gray-50"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="bg-red-700 hover:bg-red-800 active:scale-95 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-xs transition-all duration-150"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
