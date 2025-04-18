import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationDropdown from "./NotificationDropdown";

const NotificationIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-indigo-600 border border-gray-300 rounded-full"
      >
        <span className="sr-only">View notifications</span>
        <div>
          <IoMdNotificationsOutline size={26} />
        </div>
      </button>
      {isOpen && <NotificationDropdown />}
    </div>
  );
};

export default NotificationIcon;
