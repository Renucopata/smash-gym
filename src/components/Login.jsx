import React from 'react'

export default function Login() {
  


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded-lg"
                type="text"
                id="username"
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded-lg"
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
  )
}
