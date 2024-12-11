// src/pages/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartsPage = () => {
  const [data, setData] = useState({
    totalActiveMembers: 0,
    newMembersThisMonth: 0,
    expiredMemberships: 0,
    renewedMemberships: 0,
    peakDay: "",
    popularPlan: "",
    planDistribution: [],
    dailyCheckIns: [],
  });

  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    fetchMockData();
  }, [timeRange]);

  const fetchMockData = () => {
    const sampleData = {
      totalActiveMembers: 120,
      newMembersThisMonth: 15,
      expiredMemberships: 5,
      renewedMemberships: 10,
      peakDay: "Miércoles",
      popularPlan: "Anual",
      planDistribution: [
        { type: "Mensual", count: 50 },
        { type: "Anual", count: 70 },
      ],
      dailyCheckIns: [
        { day: "Lunes", count: 30 },
        { day: "Martes", count: 40 },
        { day: "Miércoles", count: 50 },
        { day: "Jueves", count: 35 },
        { day: "Viernes", count: 20 },
      ],
    };

    setData(sampleData);
  };

  const planDistributionData = {
    labels: data.planDistribution.map((plan) => plan.type),
    datasets: [
      {
        label: "Distribución de Planes",
        data: data.planDistribution.map((plan) => plan.count),
        backgroundColor: ["#4CAF50", "#FF9800"],
      },
    ],
  };

  const dailyCheckInsData = {
    labels: data.dailyCheckIns.map((day) => day.day),
    datasets: [
      {
        label: "Check-Ins Diarios",
        data: data.dailyCheckIns.map((day) => day.count),
        backgroundColor: "#3B82F6",
      },
    ],
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
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="year">Este Año</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Miembros Activos</h2>
            <p className="text-2xl font-semibold">{data.totalActiveMembers}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Nuevos Miembros</h2>
            <p className="text-2xl font-semibold">{data.newMembersThisMonth}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Membresías Vencidas</h2>
            <p className="text-2xl font-semibold">{data.expiredMemberships}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Distribución de Planes</h3>
            <Pie data={planDistributionData} />
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Check-Ins Diarios</h3>
            <Bar data={dailyCheckInsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChartsPage;