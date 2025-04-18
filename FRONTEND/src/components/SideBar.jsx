import React, { useState, useEffect, useRef } from "react";
import LogoAndTitle from "./LogoAndTitle";
import { MdDashboard, MdTableChart } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbForms } from "react-icons/tb";
import { IoChevronDownOutline } from "react-icons/io5";

const Sidebar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const sidebarRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((v) => !v);
  };

  // Handle click outside to close the sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: <MdDashboard size={24} />,
      label: "Dashboard",
      isActive: true,
    },
    {
      icon: <BsCalendarEvent size={24} />,
      label: "Calendar",
    },
    {
      icon: <FiUser size={24} />,
      label: "User Profile",
    },
    {
      icon: <AiOutlineSchedule size={24} />,
      label: "Tasks",
    },
    {
      icon: <TbForms size={24} />,
      label: "Forms",
    },
  ];

  return (
    <aside className="sticky top-0 w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo and Title */}
      <LogoAndTitle />

      {/* Menu Section */}
      <div className="mt-6 flex-1">
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-gray-500">MENU</p>
        </div>

        <ul className="mb-6 flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <nav key={index} className="rounded-lg">
              <a
                href="#"
                className={`rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 ${
                  item.isActive
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-600"
                } hover:bg-gray-100`}
              >
                {item.icon}
                <span
                  className={`text-sm font-medium ${
                    item.isActive ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </nav>
          ))}

          {/* Table item with dropdown */}
          <nav className="rounded-lg flex flex-col">
            <button
              onClick={toggleDropdown}
              className="rounded-lg cursor-pointer z-full mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <MdTableChart size={24} />
              <span className="text-sm font-medium text-gray-600">Tables</span>
              <IoChevronDownOutline
                size={20}
                className={`ml-auto transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div>
                <li className="pl-10">
                  <a
                    href="#"
                    className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      Basic Table
                    </span>
                  </a>
                </li>
                <li className="pl-10">
                  <a
                    href="#"
                    className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      Data Table
                    </span>
                  </a>
                </li>
              </div>
            )}
          </nav>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
