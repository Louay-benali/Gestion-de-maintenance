import React from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

export default function NavBarDashboard({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <LeftBar onToggleSidebar={onToggleSidebar} />
      <RightBar />
    </header>
  );
}
