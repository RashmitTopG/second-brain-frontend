import { Logo } from "../icons/Logo";
import { Twitter } from "../icons/TwitterIcon";
import { Youtube } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => {
  return (
    <div className="h-screen bg-white border-r w-60 fixed left-0 top-0 px-4">
      
      <div className="flex text-2xl pt-6 pb-4">
        <SideBarItem icon={<Logo />} text="SecBrain" />
      </div>

      <div className="pt-2 pl-2 space-y-2">
        <SideBarItem icon={<Youtube />} text="Youtube" />
        <SideBarItem icon={<Twitter />} text="Twitter" />
      </div>

    </div>
  );
};
