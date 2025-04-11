import React from "react";

const NavItem = ({ icon, label, isSelected, onClick }) => {
  return (
    <nav className="rounded-lg">
      <a
        href="#"
        onClick={onClick}
        className={`rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 ${
          isSelected ? "text-blue-500" : "text-gray-500"
        } hover:bg-gray-100`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {icon}
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </a>
    </nav>
  );
};

export default NavItem;
