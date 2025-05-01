import React, { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import SearchInput from "./SearchInput";

const LeftBar = ({ onToggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    // Call the parent function to update the sidebar state
    if (onToggleSidebar) {
      onToggleSidebar(newState);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-indigo-600 border border-gray-200 rounded-md p-2"
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <HiOutlineMenuAlt1 size={24} />
      </button>
      <SearchInput
        className="w-[400px]"
        placeholder="Search or type a command..."
      />
    </div>
  );
};

export default LeftBar;
