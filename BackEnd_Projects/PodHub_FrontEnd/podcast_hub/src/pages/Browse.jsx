import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Browse = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch all podcasts from backend
    const fetchPodcasts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/podcasts`);
        const data = await res.json();
        setPodcasts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <div key={podcast._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={podcast.thumbnail}
              alt={podcast.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{podcast.title}</h2>
            <p className="text-gray-600">{podcast.creatorName}</p>
            <Link
              to={`/podcast/${podcast._id}`}
              className="text-purple-600 font-semibold hover:underline mt-2 block"
            >
              Listen Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
