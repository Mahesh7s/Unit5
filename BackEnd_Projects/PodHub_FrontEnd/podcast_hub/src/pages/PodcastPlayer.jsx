import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { getPodcastById } from "../api/podcast";
import { getEpisodes, addComment } from "../api/episode";

const PodcastPlayer = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch podcast details
  const fetchPodcast = async () => {
    try {
      const res = await getPodcastById(id, token);
      if (res.data.ok) {
        setPodcast(res.data.podcast);
        setEpisodes(res.data.episodes);
      } else {
        setMessage({ type: "error", text: res.data.message || "Failed to fetch podcast" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error fetching podcast" });
    }
  };

  useEffect(() => {
    fetchPodcast();
  }, [id]);

  // Add comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await addComment(id, { text: commentText }, token);
      if (res.data.ok) {
        setEpisodes((prev) =>
          prev.map((ep) =>
            ep._id === id ? { ...ep, comments: [...ep.comments, res.data.comment] } : ep
          )
        );
        setCommentText("");
        setMessage({ type: "success", text: "Comment added successfully!" });
      } else {
        setMessage({ type: "error", text: res.data.message || "Failed to add comment" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to add comment" });
    }
  };

  if (!podcast) return <div><Navbar /><p className="text-center mt-20">Loading podcast...</p></div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded shadow">
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
        <p className="text-gray-600 mb-4">{podcast.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Episodes</h2>
          {episodes.length === 0 ? (
            <p>No episodes available yet.</p>
          ) : (
            <ul className="space-y-4">
              {episodes.map((ep) => (
                <li key={ep._id} className="p-4 border rounded">
                  <h3 className="font-semibold">{ep.title}</h3>
                  <audio controls src={ep.audioUrl} className="w-full mt-2" />
                  <div className="mt-2">
                    <h4 className="font-semibold">Comments:</h4>
                    {ep.comments.length === 0 ? (
                      <p className="text-gray-500">No comments yet.</p>
                    ) : (
                      <ul className="space-y-1">
                        {ep.comments.map((c) => (
                          <li key={c._id} className="text-gray-700">
                            {c.user.name}: {c.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {token && (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold"
            >
              Submit Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PodcastPlayer;
