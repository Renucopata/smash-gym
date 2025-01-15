import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/AxiosInstance";

export default function EditClient({ clientId, onClose }) {
  const [clientData, setClientData] = useState(null);
  const [clientPhoto, setClientPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axiosInstance.get(
          `/clients/getOne/${clientId}`
        );
        setClientData(response.data.data[0]); // Assuming `data` is an array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Error al obtener datos del cliente.");
        setLoading(false);
      }
    };

    const fetchClientPhoto = async () => {
      try {
        const response = await axiosInstance.get(
          `/clients/${clientId}/photo`,
          { responseType: "blob" }
        );
        const photoUrl = URL.createObjectURL(response.data);
        setClientPhoto(photoUrl);
      } catch (err) {
        console.error("Error fetching client photo:", err);
        setClientPhoto(null);
      }
    };

    fetchClientData();
    fetchClientPhoto();
  }, [clientId]);

  const handleInputChange = (field, value) => {
    setClientData((prevData) => ({ ...prevData, [field]: value }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await axiosInstance.put(
        `/clients/update/${clientId}`,
        clientData
      );
      alert(response.data.message || "Datos actualizados exitosamente.");
      onClose(); // Optionally close the modal after saving
    } catch (err) {
      console.error("Error updating client data:", err);
      alert(err.response?.data?.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-4">Cargando datos del cliente...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Section */}
        <div className="w-1/3 flex flex-col items-center">
          {clientPhoto ? (
            <img
              src={clientPhoto}
              alt="Foto del Cliente"
              className="w-48 h-48 rounded-full mb-4 object-cover"
            />
          ) : (
            <div className="w-48 h-48 rounded-full bg-gray-200 flex justify-center items-center text-gray-500 mb-4">
              Sin foto
            </div>
          )}
          
        </div>

        {/* Client Info Section */}
        <div className="w-2/3 pl-6">
          <h2 className="text-2xl font-bold mb-4">Detalles del Cliente</h2>
          <table className="w-full text-left">
            <tbody>
              {Object.keys(clientData).map((key) => (
                <tr key={key}>
                  <td className="font-bold pr-4 py-2">{key.replace(/_/g, " ")}:</td>
                  <td>
                    <input
                      type="text"
                      value={clientData[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              className="font-jaro bg-[#0bae90] text-white px-4 py-2 rounded shadow hover:bg-emerald-300"
              onClick={saveChanges}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
