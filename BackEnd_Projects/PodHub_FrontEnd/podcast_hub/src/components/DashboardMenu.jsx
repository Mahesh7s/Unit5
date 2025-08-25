import React from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
  return (
    <div className="flex justify-around bg-gray-100 p-4 shadow-md rounded-lg">
      <Link to="/dashboard/mylibrary" className="text-blue-600 font-semibold hover:underline">
        My Library
      </Link>
      <Link to="/dashboard/subscriptions" className="text-blue-600 font-semibold hover:underline">
        Subscriptions
      </Link>
      <Link to="/browse" className="text-blue-600 font-semibold hover:underline">
        Discover
      </Link>
    </div>
  );
};

export default DashboardMenu;
