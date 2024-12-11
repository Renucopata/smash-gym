import React from 'react'

export default function RegisterModal(props) {
    const {onClose} = props
  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded shadow-lg w-96"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">Registro de asistencia</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Carnet</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="1243234"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hora de entrada</label>
          <input
            type="time"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
    </div>
  </div>
  )
}
