import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { getMyPodcasts, deletePodcast } from "../api/podcast";

const ManagePodcasts = () => {
  const { token } = useContext(AuthContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch podcasts
  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const response = await getMyPodcasts(token);
      if (response.data.ok) {
        setPodcasts(response.data.podcasts);
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to fetch podcasts." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to fetch podcasts." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  // Delete podcast
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) return;
    try {
      const response = await deletePodcast(id, token);
      if (response.data.ok) {
        setMessage({ type: "success", text: "Podcast deleted successfully." });
        setPodcasts(podcasts.filter((p) => p._id !== id));
      } else {
        setMessage({ type: "error", text: response.data.message || "Delete failed." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Delete failed." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">My Podcasts</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <p>Loading podcasts...</p>
        ) : podcasts.length === 0 ? (
          <p>No podcasts uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {podcasts.map((podcast) => (
              <li
                key={podcast._id}
                className="flex justify-between items-center p-4 border rounded hover:shadow"
              >
                <div>
                  <h3 className="font-semibold text-lg">{podcast.title}</h3>
                  <p className="text-gray-600">{podcast.category}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-400 text-white"
                    onClick={() => alert("Edit feature coming soon!")}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 text-white"
                    onClick={() => handleDelete(podcast._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManagePodcasts;
