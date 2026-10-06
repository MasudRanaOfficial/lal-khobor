import { Article } from "@/types/newstypes";
import Link from "next/link";

interface OtherNewProps {
  otherNew: Article;
}

const OnCard = ({ otherNew }: OtherNewProps) => {
  return (
    <Link href={`/news/${otherNew.id}`}>
      <div className="flex-1 flex flex-col justify-center py-3">
        <p className="text-red-700 text-xs font-semibold mb-1">
          {otherNew.category}
        </p>
        <h3 className="font-bold text-base leading-snug hover:text-red-700 cursor-pointer transition-colors">
          {otherNew.title}
        </h3>
      </div>
    </Link>
  );
};

export default OnCard;
