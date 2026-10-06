import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="w-full bg-white border-b border-gray-100 pt-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex items-center justify-between gap-4">
        {/* ব্যালেন্সের জন্য বাম স্পেসার (ডেস্কটপে ডানদিকের বাটনের সমান প্রস্থ) */}
        <div className="hidden md:block w-36 shrink-0" aria-hidden="true" />

        {/* সেন্টার: লোগো, ব্র্যান্ড নাম ও বাংলা তারিখ */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-hidden"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Image
              className="w-6 h-6 object-contain"
              height={24}
              width={24}
              src="/Logo.png"
              alt="লাল খবর লোগো"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 leading-none">
              <span className="text-red-600">লাল</span> খবর
            </div>
            <span className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1 select-none">
              {date}
            </span>
          </div>
        </Link>

        {/* ডানপাশ: অথেন্টিকেশন বাটন */}
        <UserInfo />
      </div>

      {/* নেভিগেশন বার */}
      <NavLinks />

      {/* স্ক্রলিং ব্রেকিং নিউজ মারকুই */}
      <Marquee />
    </header>
  );
};

export default Header;
