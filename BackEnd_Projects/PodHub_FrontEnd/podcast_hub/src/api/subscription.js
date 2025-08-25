// src/api/subscription.js
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

// ========== SUBSCRIPTION API FUNCTIONS ==========

// Subscribe to a creator
export const subscribeCreator = async (creatorId) => {
  const response = await api.post(
    ENDPOINTS.subscription.subscribe,
    { creatorId },
    { headers: authHeader() }
  );
  return response.data;
};

// Unsubscribe from a creator
export const unsubscribeCreator = async (creatorId) => {
  const response = await api.post(
    ENDPOINTS.subscription.unsubscribe,
    { creatorId },
    { headers: authHeader() }
  );
  return response.data;
};

// Alias for frontend compatibility
export const subscribeToPodcast = subscribeCreator;
export const unsubscribeFromPodcast = unsubscribeCreator;

// Get subscriptions of logged-in user
export const getMySubscriptions = async () => {
  const response = await api.get(ENDPOINTS.subscription.mySubscriptions, {
    headers: authHeader(),
  });
  return response.data;
};

// Get subscribers of a creator (creator/admin)
export const getSubscribers = async (creatorId) => {
  const response = await api.get(`${ENDPOINTS.subscription.subscribers}/${creatorId}`, {
    headers: authHeader(),
  });
  return response.data;
};
