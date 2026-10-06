import type { Nav } from "@/types/newstypes";
import { navData } from "@/utils/api";
import Link from "next/link";

const NavLinks = async () => {
  const navs: Nav[] = await navData();
  const filteredNavs = navs?.filter((n) => n.scrapable) || [];

  return (
    <nav className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* মোবাইলে লিঙ্ক বেশি হলে যাতে মসৃণভাবে হরাইজন্টাল স্ক্রল করা যায় */}
        <ul className="flex items-center justify-start md:justify-center gap-6 md:gap-8 py-3 text-sm md:text-base font-medium text-gray-800 overflow-x-auto no-scrollbar whitespace-nowrap">
          {/* হোম লিঙ্ক */}
          <li className="shrink-0">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-700 transition-colors duration-150"
            >
              হোম
            </Link>
          </li>

          {/* ডাইনামিক ক্যাটাগরি লিঙ্কস */}
          {filteredNavs.map((item) => (
            <li key={item.slug || item.title} className="shrink-0">
              <Link
                href={`/category/${item.slug}`}
                className="text-gray-700 hover:text-red-700 transition-colors duration-150"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
