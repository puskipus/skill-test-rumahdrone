import React from "react";
import { NavLink } from "react-router-dom";

export default function NavlinkSidebar({ to, icon, text }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group bg-slate-300"
            : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
        }
      >
        <svg
          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          {icon}
        </svg>
        <span className="flex-1 ms-3 whitespace-nowrap">{text}</span>
      </NavLink>
    </li>
  );
}
