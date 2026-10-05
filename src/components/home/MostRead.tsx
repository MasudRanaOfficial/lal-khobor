import { mostReadData } from "@/utils/api";

const MostRead = async () => {
  const data = await mostReadData();

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm max-w-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-5">সর্বাধিক পঠিত</h2>

      <div className="space-y-4">
        {data.map((mostRead) => (
          <div key={mostRead.id} className="flex items-start gap-3">
            <span className="text-2xl font-serif font-bold text-red-700 leading-none min-w-6 text-right">
              {mostRead.rank}
            </span>

            <h3 className="font-semibold text-sm leading-snug text-gray-900 hover:text-red-700 cursor-pointer transition-colors">
              {mostRead.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostRead;
