import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PodcastDetail = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/podcasts/${id}`);
        const data = await res.json();
        setPodcast(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPodcast();
  }, [id]);

  if (!podcast) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{podcast.title}</h1>
      <img
        src={podcast.thumbnail}
        alt={podcast.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-4">{podcast.description}</p>
      <audio controls className="w-full">
        <source src={podcast.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PodcastDetail;
