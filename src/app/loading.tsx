import Image from "next/image";

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-16 px-4">
      {/* লোগো ও পালসিং স্পিনার কন্টেইনার */}
      <div className="relative flex items-center justify-center mb-6">
        {/* ব্যাকগ্রাউন্ড রিফ্লেকশন / গ্লো */}
        <div className="absolute w-28 h-28 rounded-full bg-red-600/10 animate-ping" />
        <div className="absolute w-24 h-24 rounded-full bg-red-600/15 animate-pulse" />

        {/* স্পিনিং বর্ডার রিং */}
        <div className="w-20 h-20 rounded-full border-3 border-gray-200 border-t-red-600 border-r-red-600 animate-spin" />

        {/* সেন্ট্রাল লোগো */}
        <div className="absolute w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-md">
          <Image
            className="w-7 h-7 object-contain animate-pulse"
            height={28}
            width={28}
            src="/Logo.png"
            alt="লাল খবর লোগো"
            priority
          />
        </div>
      </div>

      {/* ব্র্যান্ডিং টেক্সট */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-gray-900">
          <span className="text-red-600">লাল</span> খবর
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500">
          <span>সর্বশেষ সংবাদ লোড হচ্ছে</span>
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
