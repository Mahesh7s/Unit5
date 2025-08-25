import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-purple-600">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <Link to="/" className="mt-6 text-blue-500 font-semibold hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
