import React from 'react'

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }
