import React , {useState  } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import SearchInput from "./SearchInput";

const LeftBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center space-x-4">
      <button className="text-gray-600 hover:text-indigo-600 border border-gray-200 rounded-md p-2">
        <HiOutlineMenuAlt1 size={24} />
      </button>
      <SearchInput />
    </div>
  );
};

export default LeftBar;
