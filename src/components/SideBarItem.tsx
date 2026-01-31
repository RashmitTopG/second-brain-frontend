import type { ReactElement } from "react";

export const SideBarItem = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-200 rounded">
      <div className="mr-3 flex items-center">
        {icon}
      </div>
      <div className="flex items-center">
        {text}
      </div>
    </div>
  );
};
