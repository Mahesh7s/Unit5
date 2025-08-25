// src/api/user.js
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

// ========== USER API FUNCTIONS ==========

// Get user by ID
export const getUserById = async (userId) => {
  const response = await api.get(`${ENDPOINTS.user.getById}/${userId}`, {
    headers: authHeader(),
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId, data) => {
  const response = await api.put(`${ENDPOINTS.user.update}/${userId}`, data, {
    headers: authHeader(),
  });
  return response.data;
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await api.get(ENDPOINTS.user.all, { headers: authHeader() });
  return response.data;
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  const response = await api.delete(`${ENDPOINTS.user.delete}/${userId}`, {
    headers: authHeader(),
  });
  return response.data;
};
