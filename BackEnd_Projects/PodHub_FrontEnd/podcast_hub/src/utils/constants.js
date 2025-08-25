// src/utils/constants.js
export const API_BASE_URL = "http://localhost:3000/api";

export const apiUrl = (path = "") =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const STORAGE_KEYS = {
  user: "podhub_user",
  token: "podhub_token",
};

export const getStoredToken = () => localStorage.getItem(STORAGE_KEYS.token);

export const authHeader = () => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const ROLES = Object.freeze({
  LISTENER: "listener",
  CREATOR: "creator",
  ADMIN: "admin",
});

export const MAX_AUDIO_DURATION_SECONDS = 180;
export const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/webm",
];

export const PAGE_SIZE = 12;
export const REQUEST_TIMEOUT_MS = 20000;

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token) => `/auth/reset-password/${token}`,
  },
  users: {
    profile: "/users/me",
    updateProfile: "/users/me",
    updatePassword: "/users/password",
    avatar: "/users/avatar",
  },
  podcasts: {
    root: "/podcasts",
    byId: (id) => `/podcasts/${id}`,
    search: "/podcasts/search",
    mine: "/podcasts/mine",
  },
  episodes: {
    root: "/episodes",
    byId: (id) => `/episodes/${id}`,
    byPodcast: (podcastId) => `/podcasts/${podcastId}/episodes`,
    upload: "/episodes/upload",
    stream: (id) => `/episodes/${id}/stream`,
  },
  subscriptions: {
    root: "/subscriptions",
    toggle: (podcastId) => `/subscriptions/${podcastId}`,
    mine: "/subscriptions/me",
  },
  analytics: {
    episode: (episodeId) => `/analytics/episodes/${episodeId}`,
    podcast: (podcastId) => `/analytics/podcasts/${podcastId}`,
  },
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
