import { createContext, useState } from "react";

// Create the context
export const PlayerContext = createContext();

// Named export of the provider
export const PlayerProvider = ({ children }) => {
  const [playing, setPlaying] = useState(null);
  const [queue, setQueue] = useState([]);

  const playEpisode = (episode) => {
    setPlaying(episode);
  };

  const addToQueue = (episode) => {
    setQueue((prev) => [...prev, episode]);
  };

  return (
    <PlayerContext.Provider value={{ playing, playEpisode, queue, addToQueue }}>
      {children}
    </PlayerContext.Provider>
  );
};
