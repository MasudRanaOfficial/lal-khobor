import type { Nav } from "@/types/newstypes";
import { navData } from "@/utils/api";
import Link from "next/link";

const NavLinks = async () => {
  const navs: Nav[] = await navData();
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center space-x-6 md:space-x-8 py-3 text-sm md:text-base font-medium text-gray-800">
          <Link href="/" className="text-red-700 font-semibold">
            হোম
          </Link>
          {filteredNavs.map((item) => (
            <li key={item.slug || item.title}>
              <a
                href={item.url || item.slug}
                className="transition-colors duration-150 text-gray-700 hover:text-red-700"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;