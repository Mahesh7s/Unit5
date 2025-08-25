import React from "react";
import { Link } from "react-router-dom";

const PodcastCard = ({ podcast }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <Link to={`/podcast/${podcast._id}`}>
        <img
          src={podcast.image || "/logo.png"}
          alt={podcast.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h2 className="text-lg font-semibold">{podcast.title}</h2>
        <p className="text-sm text-gray-500">{podcast.description}</p>
      </Link>
    </div>
  );
};

export default PodcastCard;
