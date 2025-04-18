import React from "react";
import UserMenu from "./UserMenu";
import NotificationIcon from "./NotificationIcon";

const RightBar = () => {
  return (
    <div className="flex items-center space-x-4">
      <NotificationIcon />
      <UserMenu />
    </div>
  );
};

export default RightBar;
