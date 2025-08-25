// src/api/episode.js
import axios from "axios";
import { apiUrl, ENDPOINTS, STORAGE_KEYS, authHeader } from "../utils/constants";

// Axios instance
const api = axios.create({
  baseURL: apiUrl(),
  timeout: 20000,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== EPISODE API FUNCTIONS ==========

// Get all episodes of a podcast
export const getEpisodesByPodcast = async (podcastId) => {
  const response = await api.get(`${ENDPOINTS.episode.byPodcast}/${podcastId}`);
  return response.data;
};

// Alias for frontend compatibility
export const getEpisodes = getEpisodesByPodcast;

// Get single episode
export const getEpisodeById = async (episodeId) => {
  const response = await api.get(`${ENDPOINTS.episode.getById}/${episodeId}`);
  return response.data;
};

// Create a new episode (creator only)
export const createEpisode = async (episodeData) => {
  const response = await api.post(ENDPOINTS.episode.create, episodeData, {
    headers: authHeader(),
  });
  return response.data;
};

// Update an episode (creator/admin)
export const updateEpisode = async (episodeId, data) => {
  const response = await api.put(`${ENDPOINTS.episode.update}/${episodeId}`, data, {
    headers: authHeader(),
  });
  return response.data;
};

// Delete an episode (creator/admin)
export const deleteEpisode = async (episodeId) => {
  const response = await api.delete(`${ENDPOINTS.episode.delete}/${episodeId}`, {
    headers: authHeader(),
  });
  return response.data;
};

// Add comment to an episode
export const addComment = async (episodeId, comment) => {
  const response = await api.post(
    `${ENDPOINTS.episode.addComment}/${episodeId}`,
    { comment },
    { headers: authHeader() }
  );
  return response.data;
};
