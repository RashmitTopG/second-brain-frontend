import { useState } from "react";
import { Button } from "./Button";
import OptionsIcon from "../icons/OptionsIcon";
import useShareBrain from "../hooks/useShareBrain";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const { shareBrain, disableShare } = useShareBrain();

  const handleEnableShare = async () => {
    await shareBrain();
    setOpen(false);
  };

  const handleDisableShare = async () => {
    await disableShare();
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={() => setOpen(!open)}
        variant="secondary"
        text="Share Options"
        startIcon={<OptionsIcon />}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border">
          <button
            onClick={handleEnableShare}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Enable Share
          </button>

          <button
            onClick={handleDisableShare}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Disable Share
          </button>
        </div>
      )}
    </div>
  );
}
