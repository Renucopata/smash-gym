import React, { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div
          className={`${
            isOpen ? "w-64" : "w-16"
          } bg-blue-700 text-white transition-all duration-300 h-full flex flex-col`}
        >
          <button
            className="p-4 focus:outline-none text-white hover:bg-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <nav className="flex flex-col mt-4">
            <a href="#" className="py-2 px-4 hover:bg-blue-600">
              Dashboard
            </a>
            <a href="#" className="py-2 px-4 hover:bg-blue-600">
              Attendance
            </a>
            <a href="#" className="py-2 px-4 hover:bg-blue-600">
              Settings
            </a>
          </nav>
        </div>
      );
    };
 
