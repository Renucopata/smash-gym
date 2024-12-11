import React, { useState } from "react";

const employeeData = [
  {
    id: 1,
    name: "John Doe",
    position: "Gerente",
    hireDate: "2020-05-10",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Recepcionista",
    hireDate: "2022-01-15",
    status: "on leave",
  },
  {
    id: 3,
    name: "Mark Johnson",
    position: "Entrenador",
    hireDate: "2021-11-25",
    status: "inactive",
  },
];

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = employeeData.filter((employee) => {
    if (activeTab === "active") return employee.status === "active";
    if (activeTab === "inactive") return employee.status === "inactive";
    return true; // For "all"
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[90vw] h-[90vh] bg-[#d9bddc] shadow-lg rounded-lg p-6">
        {/* Breadcrumbs */}
        <div className="font-jaro text-md text-black mb-4">
          <span>Tablero</span> &gt; <span>Personal</span>
        </div>

        {/* Tabs */}
        <div className="relative mb-6 border-b border-gray-200">
          <div className="font-jaro text-xl flex space-x-6">
            {["all", "active", "inactive"].map((tab) => (
              <button
                key={tab}
                className={`relative pb-2 ${
                  activeTab === tab
                    ? "text-[#834f9b] font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" && "Todo el personal"}
                {tab === "active" && "Personal Activo"}
                {tab === "inactive" && "Personal Inactivo"}
              </button>
            ))}
          </div>
          <div
            className="absolute bottom-0 h-0.5 bg-[#834f9b] transition-all duration-300"
            style={{
              width: "150px",
              transform: `translateX(${
                ["all", "active", "inactive"].indexOf(activeTab) * 100
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
          <button className="font-jaro bg-[#0bae90] text-white px-4 py-2 rounded shadow hover:bg-emerald-300">
            Añadir Personal
          </button>
        </div>

        {/* Employee List */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Carnet</th>
                <th className="border-b p-2">Nombre</th>
                <th className="border-b p-2">Puesto</th>
                <th className="border-b p-2">Fecha de empleo</th>
                <th className="border-b p-2">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{employee.id}</td>
                  <td className="p-2 border-b">{employee.name}</td>
                  <td className="p-2 border-b">{employee.position}</td>
                  <td className="p-2 border-b">{employee.hireDate}</td>
                  <td className="p-2 border-b">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.status === "active"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "on leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status}
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
  );
};

export default EmployeesPage;
