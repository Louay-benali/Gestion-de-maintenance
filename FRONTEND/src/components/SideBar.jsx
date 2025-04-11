import React, { useState, useEffect, useRef } from "react";

const Sidebar = ({ page }) => {
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

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and Title */}
      <div className="p-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
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
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>
        <span className="text-xl font-semibold">TailAdmin</span>
      </div>

      {/* Menu Section */}
      <div className="mt-6 ">
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-gray-500">MENU</p>
        </div>

        <ul className="mb-6 flex flex-col gap-4">
          {/* DASHBOARD   Section */}
          <nav className=" rounded-lg ">
            <a
              href="#"
              className="rounded-lg mr-4 ml-4  flex items-center gap-3 px-4 py-2 text-blue-500  hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={`h-6 w-6 ${
                  selected === "Dashboard" ||
                  page === "ecommerce" ||
                  page === "analytics" ||
                  page === "marketing" ||
                  page === "crm" ||
                  page === "stocks"
                    ? "text-blue-500 "
                    : "text-gray-400"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-medium text-blue-500">
                Dashboard
              </span>
            </a>
          </nav>
          {/* Calender Item */}
          <nav className="rounded-lg ">
            <a
              href="#"
              className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
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
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Calender
              </span>
            </a>
          </nav>

          {/* User item */}
          <nav className="rounded-lg ">
            <a
              href="#"
              className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={`w-6 h-6 ${
                  selected === "Profile" && page === "profile"
                    ? "text-brand-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                User Profile
              </span>
            </a>
          </nav>

          {/* Task item */}
          <nav className="rounded-lg ">
            <a
              href="#"
              className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={`w-6 h-6 ${
                  selected === "Task" ||
                  page === "taskList" ||
                  page === "taskKanban"
                    ? "text-brand-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.75586 5.50098C7.75586 5.08676 8.09165 4.75098 8.50586 4.75098H18.4985C18.9127 4.75098 19.2485 5.08676 19.2485 5.50098L19.2485 15.4956C19.2485 15.9098 18.9127 16.2456 18.4985 16.2456H8.50586C8.09165 16.2456 7.75586 15.9098 7.75586 15.4956V5.50098ZM8.50586 3.25098C7.26322 3.25098 6.25586 4.25834 6.25586 5.50098V6.26318H5.50195C4.25931 6.26318 3.25195 7.27054 3.25195 8.51318V18.4995C3.25195 19.7422 4.25931 20.7495 5.50195 20.7495H15.4883C16.7309 20.7495 17.7383 19.7421 17.7383 18.4995L17.7383 17.7456H18.4985C19.7411 17.7456 20.7485 16.7382 20.7485 15.4956L20.7485 5.50097C20.7485 4.25833 19.7411 3.25098 18.4985 3.25098H8.50586ZM16.2383 17.7456H8.50586C7.26322 17.7456 6.25586 16.7382 6.25586 15.4956V7.76318H5.50195C5.08774 7.76318 4.75195 8.09897 4.75195 8.51318V18.4995C4.75195 18.9137 5.08774 19.2495 5.50195 19.2495H15.4883C15.9025 19.2495 16.2383 18.9137 16.2383 18.4995L16.2383 17.7456Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">Tasks</span>
            </a>
          </nav>

          {/* Form item */}
          <nav className="rounded-lg ">
            <a
              href="#"
              className="rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={`w-6 h-6 ${
                  selected === "Forms" ||
                  page === "formElements" ||
                  page === "formLayout" ||
                  page === "proFormElements" ||
                  page === "proFormLayout"
                    ? "text-brand-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H18.5001C19.7427 20.75 20.7501 19.7426 20.7501 18.5V5.5C20.7501 4.25736 19.7427 3.25 18.5001 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H18.5001C18.9143 4.75 19.2501 5.08579 19.2501 5.5V18.5C19.2501 18.9142 18.9143 19.25 18.5001 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V5.5ZM6.25005 9.7143C6.25005 9.30008 6.58583 8.9643 7.00005 8.9643L17 8.96429C17.4143 8.96429 17.75 9.30008 17.75 9.71429C17.75 10.1285 17.4143 10.4643 17 10.4643L7.00005 10.4643C6.58583 10.4643 6.25005 10.1285 6.25005 9.7143ZM6.25005 14.2857C6.25005 13.8715 6.58583 13.5357 7.00005 13.5357H17C17.4143 13.5357 17.75 13.8715 17.75 14.2857C17.75 14.6999 17.4143 15.0357 17 15.0357H7.00005C6.58583 15.0357 6.25005 14.6999 6.25005 14.2857Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">Forms</span>
            </a>
          </nav>

          {/* Table item */}
          <nav className="rounded-lg flex flex-col">
            <button
              onClick={toggleDropdown}
              className="rounded-lg cursor-pointer z-full mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={`w-6 h-6 ${
                  selected === "Tables" ||
                  page === "basicTables" ||
                  page === "dataTables"
                    ? "text-brand-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.25 5.5C3.25 4.25736 4.25736 3.25 5.5 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V18.5C20.75 19.7426 19.7426 20.75 18.5 20.75H5.5C4.25736 20.75 3.25 19.7426 3.25 18.5V5.5ZM5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5V8.58325L19.25 8.58325V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H5.5ZM19.25 10.0833H15.416V13.9165H19.25V10.0833ZM13.916 10.0833L10.083 10.0833V13.9165L13.916 13.9165V10.0833ZM8.58301 10.0833H4.75V13.9165H8.58301V10.0833ZM4.75 18.5V15.4165H8.58301V19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5ZM10.083 19.25V15.4165L13.916 15.4165V19.25H10.083ZM15.416 19.25V15.4165H19.25V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15.416Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">Tables</span>
              <svg
                className={`stroke-current ${
                  selected === "Pages"
                    ? "menu-item-arrow-active"
                    : "menu-item-arrow-inactive"
                } ${sidebarToggle ? "lg:hidden" : ""} ml-auto`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {isOpen && (
              <div>
                <li className="pl-10">
                  <a
                    href="#"
                    className="  rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      Basic Table
                    </span>
                  </a>
                </li>
                <li className="pl-10">
                  <a
                    href="#"
                    className="  rounded-lg mr-4 ml-4 flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
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
    </div>
  );
};

export default Sidebar;
