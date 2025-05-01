import React from "react";
import { FiUser, FiSettings } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";

const UserDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-[240px] rounded-xl bg-white shadow-lg border border-gray-200 z-50">
      {/* User Info Section */}
      <div className="p-4 border-b border-gray-200">
        <h5 className="text-[14px] font-medium text-gray-900">
          Musharof Chowdhury
        </h5>
        <p className="text-[14px] text-gray-500">randomuser@pimjo.com</p>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button className="w-full flex items-center px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg">
          <FiUser className="mr-2" />
          Edit profile
        </button>
        <button className="w-full flex items-center px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg">
          <FiSettings className="mr-2" />
          Account settings
        </button>
        <button className="w-full flex items-center px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg">
          <BiSupport className="mr-2" />
          Support
        </button>
      </div>

      {/* Sign Out Section */}
      <div className="p-2 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg">
          <RiLogoutBoxLine className="mr-2" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
