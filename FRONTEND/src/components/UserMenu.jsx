import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import UserDropdown from "./UserDropdown";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-11 w-11 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User Avatar"
        />
        <button className="flex items-center justify-center pr-8 pl-4">
          <span className="text-[14px] font-normal text-[#344054] font-['Outfit',_sans-serif]">
            Musharof
          </span>
          {isOpen ? (
            <RiArrowDropUpLine size={24} />
          ) : (
            <RiArrowDropDownLine size={24} />
          )}
        </button>
      </button>

      {isOpen && <UserDropdown />}
    </div>
  );
};

export default UserMenu;
