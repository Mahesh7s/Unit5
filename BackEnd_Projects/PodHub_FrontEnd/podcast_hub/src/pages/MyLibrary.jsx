import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMySubscriptions } from "../api/subscription";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyLibrary = () => {
  const { token } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch user's subscriptions
  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await getMySubscriptions(token);
      if (response.data.ok) {
        setSubscriptions(response.data.subscriptions);
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to load subscriptions" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to load subscriptions" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">My Library</h2>

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
          <p>Loading your subscriptions...</p>
        ) : subscriptions.length === 0 ? (
          <p>You have not subscribed to any podcasts yet.</p>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((podcast) => (
              <div key={podcast._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-xl mb-2">{podcast.title}</h3>
                <p className="text-gray-600 mb-2">{podcast.description}</p>
                <div className="space-y-1">
                  {podcast.episodes && podcast.episodes.length > 0 ? (
                    podcast.episodes.map((ep) => (
                      <Link
                        key={ep._id}
                        to={`/podcast/${ep._id}`}
                        className="block text-indigo-600 hover:underline"
                      >
                        {ep.title}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No episodes yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
