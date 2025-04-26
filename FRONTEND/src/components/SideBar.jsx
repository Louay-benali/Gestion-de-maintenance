import React, { useState, useEffect, useRef } from "react";
import LogoAndTitle from "./LogoAndTitle";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiChatCircleDots } from "react-icons/pi";

const Sidebar = ({ setSelectedPage, menuItems, tableMenuItems = [] }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const sidebarRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleDropdown = () => {
    setIsOpen((v) => !v);
  };

  // Fermer la sidebar quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (label) => {
    setActiveItem(label);
    setSelectedPage(label); // ✅ Envoie l'information au parent
  };

  return (
    <aside
      ref={sidebarRef}
      className="sticky top-0 w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto font-style"
    >
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
                onClick={() => handleItemClick(item.label)}
                className={`rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 ${
                  activeItem === item.label
                    ? "text-blue-500 bg-gray-100"
                    : "text-gray-500 hover:text-gray-600"
                } hover:bg-gray-100`}
              >
                {item.icon}
                <span
                  className={`text-sm font-medium ${
                    activeItem === item.label
                      ? "text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </nav>
          ))}

          {/* Dropdown Table - Only render if tableMenuItems exist and are not empty */}
          {tableMenuItems.length > 0 && (
            <nav className="rounded-lg flex flex-col">
              <button
                onClick={toggleDropdown}
                className="rounded-lg cursor-pointer z-full mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                {tableMenuItems[0].icon}
                <span className="text-sm font-medium text-gray-600">
                  Tables
                </span>
                <IoChevronDownOutline
                  size={20}
                  className={`ml-auto transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div>
                  {tableMenuItems.map((item, index) => (
                    <li key={index} className="pl-10">
                      <a
                        href="#"
                        onClick={() => handleItemClick(item.label)}
                        className={`rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 ${
                          activeItem === item.label
                            ? "text-blue-500 bg-gray-100"
                            : "text-gray-500 hover:text-gray-600"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </div>
              )}
            </nav>
          )}
        </ul>
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-gray-500">SUPPORT</p>
        </div>
        <nav className="rounded-lg">
          <button
            onClick={() => handleItemClick("Chat")}
            className={`rounded-lg mx-4 flex items-center gap-3 px-4 py-2 w-[calc(100%-2rem)] ${
              activeItem === "Chat"
                ? "text-blue-500 bg-gray-100"
                : "text-gray-500 hover:text-gray-600"
            } hover:bg-gray-100`}
          >
            <PiChatCircleDots size={24} />
            <span className="text-sm font-medium">Chat</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
