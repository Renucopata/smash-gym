import React from "react";

export default function AddModal ({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[80vw] max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};


