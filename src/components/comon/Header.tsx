import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "../home/Marquee";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-white border-b border-gray-100 pt-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block w-36" aria-hidden="true" />
        <div className="flex flex-col items-center justify-center">
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

            <div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="text-red-600">লাল</span> খবর
              </div>
              <div className="text-[-10px] md:text-xs text-gray-500 font-medium">
                {date}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors">
            সাইন ইন
          </button>
          <button className="btn bg-red-700 hover:bg-red-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
            সাইন আপ
          </button>
        </div>
      </div>
      <NavLinks/>
      <Marquee/>
    </header>
  );
};

export default Header;
