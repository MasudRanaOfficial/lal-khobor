import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const categories = [
    { label: "বাংলাদেশ", href: "/category/bangladesh" },
    { label: "রাজনীতি", href: "/category/politics" },
    { label: "বিশ্ব", href: "/category/world" },
    { label: "অর্থনীতি", href: "/category/economy" },
    { label: "খেলা", href: "/category/sports" },
    { label: "প্রযুক্তি", href: "/category/technology" },
  ];

  const quickLinks = [
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "যোগাযোগ", href: "/contact" },
    { label: "গোপনীয়তা নীতি", href: "/privacy" },
    { label: "ব্যবহারের শর্তাবলী", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* ব্র্যান্ড ও বিবরণ */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                <Image
                  className="w-6 h-6"
                  height={300}
                  width={300}
                  src="/Logo.png"
                  alt="Logo"
                ></Image>
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-wide">
                <span className="text-red-600">লাল</span> খবর
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              সর্বশেষ ও নির্ভরযোগ্য সংবাদের বিশ্বস্ত ঠিকানা। দেশ-বিদেশের সত্য ও
              বস্তুনিষ্ঠ তথ্য পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* ক্যাটাগরি লিংক */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              বিভাগসমূহ
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* প্রয়োজনীয় লিংক */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* বটম বার: কপিরাইট ও ক্রেডিট */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© ২০২৬ লাল খবর (Lal Khobor)। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1">
            <span>উৎস ও তথ্যের সার্বিক তত্ত্বাবধানে:</span>
            <span className="text-neutral-300 font-medium">
              বিবিসি বাংলা (BBC Bangla)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  
