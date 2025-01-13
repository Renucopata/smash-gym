import React from 'react'

export default function Header() {
    return (
      <div className="flex justify-between items-center p-4 bg-[#d9bddc] shadow-md">
  <h1 className="font-jaro text-3xl hidden lg:block">¡Smash Gym!</h1>
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <span className="font-jaro text-4xl text-black">Control de asistencias</span>
  </div>
  <input
    type="text"
    placeholder="Buscar..."
    className="font-jaro bg-gray-200 border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#3b3b41] hidden lg:block"
  />
</div>
      );
    }
