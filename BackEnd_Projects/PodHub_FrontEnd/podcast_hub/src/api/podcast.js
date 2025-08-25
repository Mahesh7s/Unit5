// src/api/podcast.js
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

// ========== PODCAST API FUNCTIONS ==========

// Get all podcasts
export const getAllPodcasts = async () => {
  const response = await api.get(ENDPOINTS.podcast.all);
  return response.data;
};

// Get single podcast by ID
export const getPodcastById = async (id) => {
  const response = await api.get(`${ENDPOINTS.podcast.details}/${id}`);
  return response.data;
};

// Get podcasts created by current user
export const getMyPodcasts = async () => {
  const response = await api.get(ENDPOINTS.podcast.my, {
    headers: authHeader(),
  });
  return response.data;
};

// Create a new podcast (creator only)
export const createPodcast = async (podcastData) => {
  const response = await api.post(ENDPOINTS.podcast.create, podcastData, {
    headers: authHeader(),
  });
  return response.data;
};

// Upload podcast media/file
export const uploadPodcast = async (formData) => {
  const response = await api.post(ENDPOINTS.podcast.upload, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update a podcast (creator only)
export const updatePodcast = async (podcastId, podcastData) => {
  const response = await api.put(`${ENDPOINTS.podcast.update}/${podcastId}`, podcastData, {
    headers: authHeader(),
  });
  return response.data;
};

// Delete a podcast (creator only)
export const deletePodcast = async (podcastId) => {
  const response = await api.delete(`${ENDPOINTS.podcast.delete}/${podcastId}`, {
    headers: authHeader(),
  });
  return response.data;
};
