import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
      <Link href={"/signin"}>
        <button
          type="button"
          className="text-xs sm:text-sm font-medium text-gray-700 hover:text-red-700 transition-colors px-2 py-1.5"
        >
          সাইন ইন
        </button>
      </Link>
      <Link href={"/signup"}>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-800 active:scale-95 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-xs transition-all duration-150"
        >
          সাইন আপ
        </button>
      </Link>
    </div>
  );
};

export default UserInfo;
