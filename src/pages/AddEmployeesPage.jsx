import React, { useState } from "react";

const AddEmployeesPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "Entrenador",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Este campo es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Este campo es requerido";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Ingrese un correo valido";
    if (!formData.username.trim()) newErrors.username = "Este campo es requerido";
    if (!formData.password.trim() || formData.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (!formData.phoneNumber.trim() || !/^\d+$/.test(formData.phoneNumber))
        newErrors.phoneNumber = "Ingrese sólo numeros por favor";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // API call will go here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">Nombre(s)</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Apellido(s)</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>


          {/* Phone Number */}
                  <div>
                      <label className="block mb-2 font-medium">Número de celular</label>
                      <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                              }`}
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                  </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block mb-2 font-medium">Funcion</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300"
            >
              <option value="admin">Administrador</option>
              <option value="coach">Entrenador</option>
              <option value="receptionist">Recepcionista</option>
              <option value="manager">Gerente</option>
            </select>
          </div>


          {/* Username */}
          <div>
            <label className="block mb-2 font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            ¡Añadir al equipo!
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeesPage;

