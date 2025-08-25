// src/layouts/DashboardLayout.jsx
import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define menu items based on roles
  const menuItems = {
    listener: [
      { label: "My Profile", path: "/profile" },
      { label: "My Subscriptions", path: "/subscriptions" },
      { label: "My Library", path: "/library" },
    ],
    creator: [
      { label: "My Profile", path: "/profile" },
      { label: "Upload Podcast", path: "/upload" },
      { label: "My Uploaded Podcasts", path: "/manage" },
      { label: "Subscribers", path: "/subscriptions" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "User Management", path: "/admin/users" },
      { label: "Reports", path: "/admin/reports" },
    ],
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-xl font-bold">{user?.name || "Dashboard"}</h2>
          <p className="text-sm text-gray-400">{user?.role?.toUpperCase()}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {currentMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
