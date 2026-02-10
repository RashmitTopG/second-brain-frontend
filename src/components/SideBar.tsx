import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import NotionIcon from "../icons/NotionIcon";
import Private from "../icons/Private";
import { Twitter } from "../icons/TwitterIcon";
import { Youtube } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { SideBarItem } from "./SideBarItem";
import UserIcon from "../icons/UserIcon";

export const SideBar = ({
  onSelect,
  isOpen,
  onClose,
}: {
  onSelect: (val: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r w-60 z-50 transition-transform duration-300 transform flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:fixed`}
      >
        <div className="flex text-2xl pt-6 pb-4 items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <SideBarItem
                    icon={<Logo />}
                    text="SecBrain"
                    onSelect={() => {
                        onSelect("");
                        onClose();
                    }} 
                />
            </div>
             {/* Close button for mobile */}
             <div className="md:hidden cursor-pointer" onClick={onClose}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

             </div>
        </div>

        <div className="pt-2 pl-2 space-y-2">
          <SideBarItem
            icon={<Youtube />}
            text="Youtube"
            onSelect={() => {
                onSelect("youtube");
                onClose();
            }}
          />
          <SideBarItem
            icon={<Twitter />}
            text="Twitter"
            onSelect={() => {
                onSelect("twitter");
                onClose();
            }}
          />
          <SideBarItem
            icon={<NotionIcon />}
            text="Notion"
            onSelect={() => {
                onSelect("notion");
                onClose();
            }}
          />

          <SideBarItem
            icon={<Private />}
            text="Others"
            onSelect={() => {
                onSelect("unknown");
                onClose();
            }}
          />
        </div>

        <div className="w-full flex flex-col mt-auto pb-6 px-4">
          <Button
            startIcon={<UserIcon />}
            variant="primary"
            text="Logout"
            onClick={() => {
              localStorage.removeItem("sec-brain-token");
              navigate("/");
            }}
          />
        </div>
      </div>
       {/* Overlay for mobile */}
       {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};
