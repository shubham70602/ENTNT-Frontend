import React, { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.role) {
      localStorage.setItem("role", result.role);
      navigate(result.role === "Admin" ? "/admin" : "/user");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center flex-col space-y-8">
      
      <div className="text-sm text-white"><strong>NOTE:&nbsp;</strong>The backend is deployed on render, hence it may take sometime to login/signup for the first time. Please wait while the server boots up. Thankyou, for your patience.</div>

      
      <div className="flex items-center justify-evenly">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Login
          </h2>
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          
        <div className="p-2 max-w-xs mx-auto bg-white rounded-md shadow-sm overflow-hidden">
            <div className="text-xs">Testing accounts below</div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 text-left text-gray-600 text-xs font-semibold border">Type</th>
                  <th className="py-2 text-left text-gray-600 text-xs font-semibold border">Username</th>
                  <th className="py-2 text-left text-gray-600 text-xs font-semibold border">Password</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-1 text-gray-800 text-xs border">User</td>
                  <td className="py-1 text-gray-800 text-xs border">DS</td>
                  <td className="py-1 text-gray-800 text-xs border">1234</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-1 text-gray-800 text-xs border">Admin</td>
                  <td className="py-1 text-gray-800 text-xs border">SD</td>
                  <td className="py-1 text-gray-800 text-xs border">1234</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
