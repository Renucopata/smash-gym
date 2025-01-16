import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

export default function EmployeeShift({ onClose, carnetIdentidad }) {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShiftDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/getShift/${carnetIdentidad}`
        );
        setShiftDetails(response.data.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Error fetching shift details");
        setLoading(false);
      }
    };

    fetchShiftDetails();
  }, [carnetIdentidad]);

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(":");
      return `${hours}:${minutes}`;
    } catch (error) {
      return "Hora no válida";
    }
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    } catch (error) {
      return "Fecha no válida";
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <p className="text-center text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[90vw] max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Detalles del Turno</h2>
        <ul className="space-y-2">
          <li>
            <strong>Días de Trabajo:</strong> {shiftDetails.dias}
          </li>
          <li>
            <strong>Hora de Entrada:</strong> {formatTime(shiftDetails.hora_entrada)}
          </li>
          <li>
            <strong>Hora de Salida:</strong> {formatTime(shiftDetails.hora_salida)}
          </li>
          <li>
            <strong>Creado en:</strong> {formatDate(shiftDetails.creado_en)}
          </li>
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#0bae90] text-white px-4 py-2 rounded hover:bg-emerald-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

