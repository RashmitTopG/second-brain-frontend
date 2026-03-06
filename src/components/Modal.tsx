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

    if (hostname.includes("notion.so") || hostname.includes("notion.site"))
      return ContentTypes.Notion;

    if (pathname.toLowerCase().endsWith(".pdf")) return ContentTypes.PDF;

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewType, setPreviewType] = useState<ContentTypes>(
    ContentTypes.Unknown
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!open) return null;

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewType(detectContentType(e.target.value));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setSelectedFile(file);
      setPreviewType(ContentTypes.PDF);
      if (linkRef.current) linkRef.current.value = "";
    }
  };

  const addContent = async () => {
    const title = titleRef.current?.value ?? "";
    const linkValue = linkRef.current?.value ?? "";

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      let finalLink = linkValue;
      let finalType = detectContentType(linkValue);

      // 1. If a file is selected, upload it first to get a Cloudinary URL
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await axios.post(`${BACKEND_URL}/api/v1/upload`, formData, {
          withCredentials: true,
        });
        
        finalLink = uploadRes.data.url;
        finalType = ContentTypes.PDF;
      } else {
        if (!linkValue.trim()) {
          alert("Link is required");
          return;
        }
      }

      // 2. Send the final JSON request to create content
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link: finalLink, type: finalType },
        { withCredentials: true }
      );

      // reset state
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSelectedFile(null);
      setPreviewType(ContentTypes.Unknown);

      onClose();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Error adding content: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md relative"
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

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="application/pdf"
          onChange={handleFileSelect}
        />

        <p className="text-xs text-gray-500 text-center mt-2">
          Detected type: <b>{previewType}</b>
        </p>

        {selectedFile && (
          <p className="text-xs text-green-600 text-center">
            Selected file: {selectedFile.name}
          </p>
        )}

        <div className="flex gap-3 mt-4">
          {/* Submit (long) */}
          <div className="flex flex-col w-68">
            <Button onClick={addContent} variant="primary" text="Submit" />
          </div>

          {/* Upload File (small) */}
          <div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              text="Upload File"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
