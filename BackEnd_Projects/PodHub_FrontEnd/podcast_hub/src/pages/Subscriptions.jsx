import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllPodcasts } from "../api/podcast";
import { subscribeToPodcast, unsubscribeFromPodcast } from "../api/subscription";
import Navbar from "../components/Navbar";

const Subscriptions = () => {
  const { token } = useContext(AuthContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch all podcasts
  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const response = await getAllPodcasts(token);
      if (response.data.ok) {
        setPodcasts(response.data.podcasts);
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to load podcasts" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to load podcasts" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  // Handle subscribe
  const handleSubscribe = async (podcastId) => {
    try {
      const res = await subscribeToPodcast(podcastId, token);
      if (res.data.ok) {
        setMessage({ type: "success", text: "Subscribed successfully!" });
        fetchPodcasts();
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Subscription failed" });
    }
  };

  // Handle unsubscribe
  const handleUnsubscribe = async (podcastId) => {
    try {
      const res = await unsubscribeFromPodcast(podcastId, token);
      if (res.data.ok) {
        setMessage({ type: "success", text: "Unsubscribed successfully!" });
        fetchPodcasts();
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Unsubscription failed" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">All Podcasts</h2>

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
          <p>No podcasts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {podcasts.map((podcast) => (
              <div key={podcast._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-xl mb-2">{podcast.title}</h3>
                <p className="text-gray-600 mb-2">{podcast.description}</p>
                <button
                  onClick={() =>
                    podcast.subscribed ? handleUnsubscribe(podcast._id) : handleSubscribe(podcast._id)
                  }
                  className={`px-4 py-2 rounded ${
                    podcast.subscribed ? "bg-red-500 hover:bg-red-400 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {podcast.subscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
