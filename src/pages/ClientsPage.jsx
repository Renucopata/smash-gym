import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import AddClientModal from "../components/AddClientModal";

const ClientsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 15;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("/clients/getAll");
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Filter clients based on active tab
  const filteredClients = clients.filter((client) => {
    if (activeTab === "active") return client.estado === "activo";
    if (activeTab === "expired") return client.estado !== "activo";
    return true; // "all" tab
  });

  // Pagination logic
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[90vw] h-[90vh] bg-[#d9bddc] shadow-lg rounded-lg p-3">
        <div className="p-4">
          {/* Breadcrumbs */}
          <div className="font-jaro text-md text-black mb-2">
            <span>Tablero</span> &gt; <span>Clientes</span>
          </div>

          {/* Tabs */}
          <div className="relative mb-4 border-b border-gray-200">
            <div className="font-jaro text-xl flex space-x-6">
              {["all", "active", "expired"].map((tab) => (
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
                  {tab === "expired" && "Clientes inactivos"}
                </button>
              ))}
            </div>
            <div
              className="absolute bottom-0 h-0.5 bg-[#834f9b] transition-all duration-300"
              style={{
                width: "150px",
                transform: `translateX(${
                  ["all", "active", "expired"].indexOf(activeTab) * 100
                }%)`,
              }}
            ></div>
          </div>

          {/* Search and Add Button */}
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
              className="font-jaro bg-[#0bae90] text-white px-4 py-2 rounded shadow hover:bg-emerald-300"
            >
              Nuevo Cliente
            </button>
          </div>

          {/* Client List */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="h-[400px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">CI</th>
                  <th className="border-b p-2">Nombre</th>
                  <th className="border-b p-2">Apellido</th>
                  <th className="border-b p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((client) => (
                  <tr key={client.carnet_identidad} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{client.carnet_identidad}</td>
                    <td className="p-2 border-b">{client.nombre}</td>
                    <td className="p-2 border-b">{client.apellido}</td>
                    <td className="p-2 border-b">{client.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            {Array.from({
              length: Math.ceil(filteredClients.length / itemsPerPage),
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
      {isModalOpen && (
        <AddClientModal
        onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ClientsPage;
