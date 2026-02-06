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
}: {
  onSelect: (val: string) => void;
}) => {

  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white border-r w-60 fixed left-0 top-0 px-4 flex flex-col">
      <div className="flex text-2xl pt-6 pb-4">
        <SideBarItem
          icon={<Logo />}
          text="SecBrain"
          onSelect={() => onSelect("")} // show all
        />
      </div>

      <div className="pt-2 pl-2 space-y-2">
        <SideBarItem
          icon={<Youtube />}
          text="Youtube"
          onSelect={() => onSelect("youtube")}
        />
        <SideBarItem
          icon={<Twitter />}
          text="Twitter"
          onSelect={() => onSelect("twitter")}
        />
        <SideBarItem
          icon={<NotionIcon />}
          text="Notion"
          onSelect={() => onSelect("notion")}
        />  

        <SideBarItem
          icon={<Private />}
          text="Others"
          onSelect={() => onSelect("unknown")}
        />  
      </div>

      <div className="w-full flex flex-col  mt-auto pb-6">
        <Button startIcon = {<UserIcon/> }variant = "primary" text="Logout" onClick={()=>{
          localStorage.removeItem("sec-brain-token");
          navigate("/");
        }}></Button>
      </div>
    </div>
  );
};
