import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Logo */}
        <img src={logo} alt="PodHub Logo" className="h-20 w-20 mb-4" />

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to PodHub
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl max-w-xl mb-8">
          Discover, create, and enjoy short-form podcasts. Subscribe to your favorite creators and get notified of the latest episodes instantly!
        </p>

        {/* Get Started Button */}
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300"
        >
          Get Started
        </Link>

        {/* Optional: Additional Info */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-2">Why PodHub?</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            <li>Short-form 3-minute podcasts for quick listening.</li>
            <li>Creators can upload and manage episodes easily.</li>
            <li>Listeners get notifications and personalized recommendations.</li>
            <li>Join the PodHub community and explore engaging content.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
