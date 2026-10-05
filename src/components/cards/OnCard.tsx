import { Article } from "@/types/newstypes";

interface OtherNewProps {
  otherNew: Article;
}

const OnCard = ({ otherNew }: OtherNewProps) => {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <p className="text-red-700 text-xs font-semibold mb-1">
        {otherNew.category}
      </p>
      <h3 className="font-bold text-base leading-snug hover:text-red-700 cursor-pointer transition-colors">
        {otherNew.title}
      </h3>
    </div>
  );
};

export default OnCard;
