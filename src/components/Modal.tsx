import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentTypes {
  YouTube = "youtube",
  Twitter = "twitter",
  Notion = "notion",
  PDF = "pdf",
  Unknown = "unknown",
}

const detectContentType = (url: string): ContentTypes => {
  try {
    const { hostname, pathname } = new URL(url);

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be"))
      return ContentTypes.YouTube;

    if (hostname.includes("twitter.com") || hostname.includes("x.com"))
      return ContentTypes.Twitter;

    if (
      hostname.includes("notion.so") ||
      hostname.includes("notion.site")
    )
      return ContentTypes.Notion;

    if (pathname.endsWith(".pdf")) return ContentTypes.PDF;

    return ContentTypes.Unknown;
  } catch {
    return ContentTypes.Unknown;
  }
};

export const Modal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [previewType, setPreviewType] = useState<ContentTypes>(
    ContentTypes.Unknown
  );

  if (!open) return null;

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewType(detectContentType(e.target.value));
  };

  const addContent = async () => {
    const title = titleRef.current?.value ?? "";
    const link = linkRef.current?.value ?? "";

    if (!title.trim() || !link.trim()) {
      alert("Title and Link are required");
      return;
    }

    const type = detectContentType(link);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type }, // frontend-only detection
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sec-brain-token")}`,
          },
        }
      );

      // clear inputs
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setPreviewType(ContentTypes.Unknown);

      onClose();
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-75 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <CrossIcon />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Input ref={titleRef} placeholder="Title" />
          <Input
            ref={linkRef}
            placeholder="Link"
            onChange={handleLinkChange}
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          Detected type: <b>{previewType}</b>
        </p>

        <div className="flex justify-center mt-4">
          <Button onClick={addContent} variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
};
