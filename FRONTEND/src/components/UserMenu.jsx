import React, { useRef, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import UserDropdown from "./UserDropdown";

const UserMenu = ({ isOpen, setIsOpen, closeAllDropdowns }) => {
  const menuRef = useRef(null);

  // Effect to handle clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    // Add event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeAllDropdowns]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen()}
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <UserDropdown />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
