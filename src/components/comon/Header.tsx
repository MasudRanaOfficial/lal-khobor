import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block w-36" aria-hidden="true" />
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 bg-slate-950 rounded-xl flex items-center justify-center shadow-sm">
              <Image
                className="w-10 h-10"
                height={300}
                width={300}
                src="/Logo.png"
                alt="Logo"
              ></Image>
            </div>

            <div>
              <div className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                <span className="text-red-500">লাল</span> খবর
              </div>
              <div className="mt-1 text-xs md:text-sm text-gray-500 font-medium">
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
    </header>
  );
};

export default Header;
