// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="PodHub" className="h-10 w-10" />
        <span className="text-xl font-bold">PodHub</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/about" className="hover:text-gray-300">About Us</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}

        {user && (
          <>
            {/* Role-based links */}
            {user.role === "creator" && (
              <Link to="/dashboard" className="hover:text-gray-300">Creator Dashboard</Link>
            )}
            {user.role === "listener" && (
              <Link to="/dashboard" className="hover:text-gray-300">My Library</Link>
            )}
            {user.role === "admin" && (
              <Link to="/dashboard" className="hover:text-gray-300">Admin Panel</Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
