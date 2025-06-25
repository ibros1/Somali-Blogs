import type { FC } from "react";
import { NavLink } from "react-router-dom";

interface linkItemProps {
  icon: string;
  to: string;
  linkTitle: string;
}

const ProfileLinks: FC<linkItemProps> = (props) => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        `flex w-full h-full items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-700  sm:px-2 sm:-mx-0.5 py-1 sm:py-2 rounded-lg ${
          isActive ? "bg-indigo-100" : "text-gray-600"
        } hover:bg-indigo-100`
      }
    >
      <i
        className={`${props.icon} text-base sm:text-lg bg-gray-100 rounded-md p-1 sm:p-1.5`}
      ></i>
      <span className="text-xs sm:text-sm">{props.linkTitle}</span>
    </NavLink>
  );
};

export default ProfileLinks;
