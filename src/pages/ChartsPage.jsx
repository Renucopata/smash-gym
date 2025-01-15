import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axiosInstance from "../utils/AxiosInstance"; // Ensure this path matches your project structure

// Register required Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartsPage = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [timeRange, setTimeRange] = useState("Hoy");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customDateRange, setCustomDateRange] = useState({ dateA: "", dateB: "" });
const [customDateData, setCustomDateData] = useState([]);
const [customLoading, setCustomLoading] = useState(false);
const [customError, setCustomError] = useState(null);

const [attendanceData, setAttendanceData] = useState([]);
const [attendanceFilteredData, setAttendanceFilteredData] = useState([]);
const [attendanceTimeRange, setAttendanceTimeRange] = useState("Hoy");

const [attendanceCustomRange, setAttendanceCustomRange] = useState({
  dateA: "",
  dateB: "",
});

const [attendanceCustomData, setAttendanceCustomData] = useState([]);



  useEffect(() => {
    fetchMembershipData();
  }, [timeRange]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);
  
  useEffect(() => {
    filterAttendanceData(attendanceData, attendanceTimeRange);
  }, [attendanceTimeRange, attendanceData]);
  

  const fetchMembershipData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/reports/membershipsReport");
      setMembershipData(response.data.data);
      setError(null);
    } catch (err) {
      setError("Error fetching membership data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axiosInstance.get("/reports/attendancesReport");
      const allData = response.data.data;
      setAttendanceData(allData);
      filterAttendanceData(allData, "Hoy"); // Default filter
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
  
  
  const filterAttendanceData = (data, timeRange) => {
    const filtered = data.find((item) => item.periodo === timeRange);
    setAttendanceFilteredData(filtered ? [filtered] : []);
  };
  

  // Find the data for the selected time range
  const selectedData = membershipData.find((item) => item.periodo === timeRange) || {
    nuevas_membresias: "0",
    ingresos_totales: "0",
    membresias_vencidas: "0",
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCustomDateRange((prev) => ({ ...prev, [name]: value }));
  };
  
  const fetchCustomDateRangeData = async () => {
    try {
      setCustomLoading(true);
      const response = await axiosInstance.post("/reports/membershipsBayDateReport", customDateRange);
      setCustomDateData(response.data.data);
      setCustomError(null);
    } catch (err) {
      setCustomError("Error fetching data for the custom date range.");
    } finally {
      setCustomLoading(false);
    }
  };

  const attendanceCustomTotalData = {
    labels: attendanceCustomData.map((item) => new Date(item.fecha).toLocaleDateString("es-ES")),
    datasets: [
      {
        label: "Asistencias Totales",
        data: attendanceCustomData.map((item) => parseInt(item.asistencias_totales, 10)),
        backgroundColor: "#3B82F6",
      },
    ],
  };
  
  const attendanceCustomClientsData = {
    labels: attendanceCustomData.map((item) => new Date(item.fecha).toLocaleDateString("es-ES")),
    datasets: [
      {
        label: "Clientes Únicos",
        data: attendanceCustomData.map((item) => parseInt(item.clientes, 10)),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const fetchCustomAttendanceData = async () => {
    if (!attendanceCustomRange.dateA || !attendanceCustomRange.dateB) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/reports/attendancesByDateReport", {
        dateA: attendanceCustomRange.dateA,
        dateB: attendanceCustomRange.dateB,
      });
      setAttendanceCustomData(response.data.data);
    } catch (error) {
      console.error("Error al obtener el reporte de asistencias:", error);
      alert("Hubo un error al obtener el reporte.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
        <div className="flex justify-end mb-4">
          <select
            className="border px-4 py-2 rounded-lg"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="Hoy">Hoy</option>
            <option value="Esta Semana">Esta Semana</option>
            <option value="Este Mes">Este Mes</option>
            <option value="Este Año">Este Año</option>
          </select>
        </div>

        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold">Nuevas Membresías</h2>
                <p className="text-2xl font-semibold">{selectedData.nuevas_membresias}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold">Ingresos Totales</h2>
                <p className="text-2xl font-semibold">{selectedData.ingresos_totales}</p>
              </div>
              <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold">Membresías Vencidas</h2>
                <p className="text-2xl font-semibold">{selectedData.membresias_vencidas}</p>
              </div>
            </div>
          </>
        )}
      </div>


      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4">Reporte por Rango de Fechas</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="dateA" className="block font-bold mb-2">Fecha Inicio:</label>
      <input
        type="date"
        id="dateA"
        name="dateA"
        value={customDateRange.dateA}
        onChange={handleDateChange}
        className="border px-4 py-2 rounded-lg w-full"
      />
    </div>
    <div>
      <label htmlFor="dateB" className="block font-bold mb-2">Fecha Fin:</label>
      <input
        type="date"
        id="dateB"
        name="dateB"
        value={customDateRange.dateB}
        onChange={handleDateChange}
        className="border px-4 py-2 rounded-lg w-full"
      />
    </div>
  </div>
  <button
    onClick={fetchCustomDateRangeData}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Generar Reporte
  </button>

  {customLoading ? (
    <p className="mt-6">Cargando datos...</p>
  ) : customError ? (
    <p className="mt-6 text-red-500">{customError}</p>
  ) : customDateData.length > 0 ? (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Resultados del Rango Seleccionado</h3>
      <Bar
        data={{
          labels: customDateData.map((item) => new Date(item.fecha).toLocaleDateString("es-ES")),
          datasets: [
            {
              label: "Nuevas Membresías",
              data: customDateData.map((item) => parseInt(item.nuevas_membresias, 10)),
              backgroundColor: "#4CAF50",
            },
            {
              label: "Ingresos Totales",
              data: customDateData.map((item) => parseFloat(item.ingresos_totales)),
              backgroundColor: "#3B82F6",
            },
            {
              label: "Membresías Vencidas",
              data: customDateData.map((item) => parseInt(item.membresias_vencidas, 10)),
              backgroundColor: "#FF9800",
            },
          ],
        }}
      />
    </div>
  ) : (
    <p className="mt-6">No hay datos disponibles para este rango de fechas.</p>
  )}
</div>


 {/* Asistencias */}
 <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
 <div className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Reporte de Asistencias</h2>
  <div className="flex justify-end mb-4">
    <select
      className="border px-4 py-2 rounded-lg"
      value={attendanceTimeRange}
      onChange={(e) => setAttendanceTimeRange(e.target.value)}
    >
      <option value="Hoy">Hoy</option>
      <option value="Esta Semana">Esta Semana</option>
      <option value="Este Mes">Este Mes</option>
      <option value="Este Año">Este Año</option>
    </select>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {attendanceFilteredData.map((item, index) => (
      <div key={`attendance-${index}`} className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-bold">{item.periodo} - Asistencias Totales</h3>
        <p className="text-2xl font-semibold text-blue-800">{item.asistencias_totales}</p>
      </div>
    ))}
    {attendanceFilteredData.map((item, index) => (
      <div key={`clients-${index}`} className="p-4 bg-green-100 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-bold">{item.periodo} - Clientes Únicos</h3>
        <p className="text-2xl font-semibold text-green-700">{item.clientes}</p>
      </div>
    ))}
  </div>
</div>
</div>

{/* Asistencias por rango*/}

<div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
<div className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Asistencias por Rango de Fecha</h2>
  <div className="flex justify-between mb-4">
    <div className="flex gap-4">
      <input
        type="date"
        className="border px-4 py-2 rounded-lg"
        value={attendanceCustomRange.dateA}
        onChange={(e) => setAttendanceCustomRange({ ...attendanceCustomRange, dateA: e.target.value })}
      />
      <input
        type="date"
        className="border px-4 py-2 rounded-lg"
        value={attendanceCustomRange.dateB}
        onChange={(e) => setAttendanceCustomRange({ ...attendanceCustomRange, dateB: e.target.value })}
      />
    </div>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      onClick={fetchCustomAttendanceData}
    >
      Aplicar
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Asistencias Totales</h3>
      <Bar data={attendanceCustomTotalData} />
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Clientes Únicos</h3>
      <Bar data={attendanceCustomClientsData} />
    </div>
  </div>
</div>
</div>




    </div>
  );
};

export default ChartsPage;
