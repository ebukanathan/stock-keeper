import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import axios from "axios";
import api from "../api/axios.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      console.log(response.data);

      //decide where to navigate based on role
      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log({ err: error });
    }
  };

  return (
    <div>
      <div className="w-full max-w-md mt-8 mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              value={password}
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-md font-normal mt-5 text-center">
          no account?{" "}
          <span className="text-blue-500">
            <a href="/signup">Signup</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
