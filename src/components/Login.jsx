import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Fetch API example
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      console.log(response.data.test);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Handle login button click
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[40vw] bg-[#d9bddc] p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl font-jaro text-gray-700 mb-6 text-center">¡Ingresa tus credenciales!</h2>
        <form>
          {/* Username Field */}
          <div className="mb-6">
            <label className="font-jaro block text-gray-600 mb-2 text-lg" htmlFor="username">
              Usuario
            </label>
            <input
              className="block w-full p-3 border border-gray-300 rounded-lg text-lg"
              type="text"
              id="username"
              placeholder="Ingresa tu usuario"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="font-jaro block text-gray-600 mb-2 text-lg" htmlFor="password">
              Contraseña
            </label>
            <input
              className="block w-full p-3 border border-gray-300 rounded-lg text-lg"
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-[#0bae90] hover:bg-emerald-300 text-white font-jaro py-3 px-6 rounded-lg text-lg"
            type="submit"
            onClick={handleLogin}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

