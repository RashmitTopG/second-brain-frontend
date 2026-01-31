import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "pdf";
}

export const Card = (props: CardProps) => {
  const { title, link, type } = props;

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 w-72 min-h-48 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-gray-500 shrink-0">
            <ShareIcon />
          </span>
          <span className="font-medium truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={link}
            target="_blank"
            className="text-gray-500 hover:opacity-80"
          >
            <ShareIcon />
          </a>
          <span className="text-gray-500">
            <ShareIcon />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 flex-1">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-sm"
            src={link.replace("watch", "embed")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
 