import { useEffect } from "react";
import TrashIcon from "../icons/TrashIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ContentItem from "../icons/ContentIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "pdf" | "notion" | "unknwon";
  onDelete?: () => void;
  onOpen?: () => void;
}

declare global {
  interface Window {
    twttr: any;
  }
}

export const Card = (props: CardProps) => {
  const { title, link, type, onDelete } = props;

  useEffect(() => {
    if (type === "twitter" && window.twttr) {
      window.twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 w-80 min-h-48 flex flex-col ">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-gray-500 shrink-0">
            <ContentItem />
          </span>
          <span className="font-medium text-lg truncate pl-2">{title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 cursor-pointer hover:opacity-80">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <RedirectIcon />
          </a>

          <span
            className="text-gray-500 cursor-pointer hover:opacity-80"
            onClick={onDelete}
          >
            <TrashIcon />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 flex-1">
        {/* YouTube */}
        {type === "youtube" &&
          (() => {
            const videoId = new URL(link).searchParams.get("v");
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            return (
              <iframe
                className="w-full aspect-video rounded-sm"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              />
            );
          })()}

        {/* Twitter */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {/* Notion */}
        {type === "notion" && (
          <iframe
            className="w-full h-100 rounded-sm border"
            srcDoc={`
      <html>
        <body style="
          margin:0;
          height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#f1f5f9;
        ">
          <img 
            src="https://static0.xdaimages.com/wordpress/wp-content/uploads/2025/06/unique-ways-to-use-notion.jpg"
            style="
              width:100%;
              height:100%;
              object-fit:cover;
              object-position:center;
            "
          />
        </body>
      </html>
    `}
          />
        )}
      </div>
    </div>
  );
};
