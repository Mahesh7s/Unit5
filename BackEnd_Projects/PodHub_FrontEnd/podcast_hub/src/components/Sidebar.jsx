import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-gray-900 text-white h-screen w-64 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">PodHub</h2>

      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:text-purple-400">Dashboard</Link>
        <Link to="/dashboard/mylibrary" className="hover:text-purple-400">My Library</Link>
        <Link to="/dashboard/subscriptions" className="hover:text-purple-400">Subscriptions</Link>

        {/* Role-based links */}
        {user?.role === "creator" && (
          <>
            <Link to="/dashboard/upload" className="hover:text-purple-400">Upload Podcast</Link>
            <Link to="/dashboard/manage" className="hover:text-purple-400">Manage Podcasts</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/dashboard/users" className="hover:text-purple-400">Manage Users</Link>
            <Link to="/dashboard/reports" className="hover:text-purple-400">Reports</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
