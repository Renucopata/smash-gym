import React, { useState } from "react";
import AddModal from "../components/AddModal";

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    planType: "Monthly",
    startDate: "2023-11-01",
    endDate: "2023-12-01",
    daysLeft: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    planType: "Annual",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    daysLeft: 30,
    status: "freeze",
  },
  {
    id: 3,
    name: "Mark Johnson",
    planType: "Quarterly",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    daysLeft: 0,
    status: "expired",
  },
];

 const ClientsListPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const itemsPerPage = 5;

  // Filter data based on the active tab
  const filteredData = sampleData.filter((client) => {
    if (activeTab === "active") return client.status === "active";
    if (activeTab === "expired")
      return client.daysLeft === 0 && new Date(client.endDate) <= new Date();
    return true; // For "all"
  });

  // Handle pagination
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
<div className="min-h-screen bg-gray-100 flex justify-center items-center">
<div className="w-[90vw] h-[90vh] bg-[#d9bddc] shadow-lg rounded-lg p-6">


    <div className="p-6">
      {/* Breadcrumbs */}
      <div className="font-jaro text-md text-black mb-4">
        <span>Tablero</span> &gt; <span>Clientes</span>
      </div>

      {/* Tabs with Underline */}
<div className="relative mb-6 border-b border-gray-200">
  <div className="font-jaro text-xl flex space-x-6">
    {["all", "active", "expired"].map((tab, index) => (
      <button
        key={tab}
        className={`relative pb-2 ${
          activeTab === tab
            ? "text-[#834f9b] font-semibold"
            : "text-gray-500 hover:text-gray-800"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab === "all" && "Todos los clientes"}
        {tab === "active" && "Clientes activos"}
        {tab === "expired" && "Cientes inactivos"}
      </button>
    ))}
  </div>
  {/* Fixed Underline */}

  <div
    className="absolute bottom-0 h-0.5 bg-[#834f9b] transition-all duration-300"
    style={{
      width: "150px", // Adjust width per tab (3 tabs)
      transform: `translateX(${
        ["all", "active", "expired"].indexOf(activeTab) * 100
      }%)`,
    }}
  ></div>
</div>

      {/* Search Bar and Add Button */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="font-jaro bg-gray-200 border rounded px-4 py-2 w-1/3"
        />
        <button 
            onClick={openModal}
            className="font-jaro bg-[#0bae90] text-white px-4 py-2 rounded shadow hover:bg-emerald-300">
          Nuevo Cliente
        </button>
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Client"
      >
        {/* Form Content */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              placeholder="Client Name"
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Plan Type</label>
            <select className="w-full border rounded px-4 py-2">
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </AddModal>

      {/* Client List */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th className="border-b p-2">Carnet</th>
        <th className="border-b p-2">Nombre</th>
        <th className="border-b p-2">Plan</th>
        <th className="border-b p-2">Fecha Inicio</th>
        <th className="border-b p-2">Fecha Fin</th>
        <th className="border-b p-2">Dias Restantes</th>
        <th className="border-b p-2">Estatus</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.map((client) => (
        <tr key={client.id} className="hover:bg-gray-50">
          <td className="p-2 border-b">{client.id}</td>
          <td className="p-2 border-b">{client.name}</td>
          <td className="p-2 border-b">{client.planType}</td>
          <td className="p-2 border-b">{client.startDate}</td>
          <td className="p-2 border-b">{client.endDate}</td>
          <td className="p-2 border-b">{client.daysLeft}</td>
          <td className="p-2 border-b">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                client.status === "active"
                  ? "bg-green-100 text-green-800"
                  : client.status === "freeze"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {client.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {Array.from({
          length: Math.ceil(filteredData.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-[#0bae90] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>

    </div>
    </div>
  );
};

export default ClientsListPage;
