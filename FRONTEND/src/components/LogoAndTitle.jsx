import React from "react";

const LogoAndTitle = () => {
  return (
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
        <span className="text-xl font-semibold">EMKA-MEd</span>
      </div>
  );
};

export default LogoAndTitle;
