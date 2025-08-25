// src/api/auth.js
import axios from "axios";
import { apiUrl, ENDPOINTS, STORAGE_KEYS, authHeader } from "../utils/constants";

// Create Axios instance
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

// ========== AUTH API FUNCTIONS ==========

// ✅ Register new user
export const registerUser = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.auth.register, data);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// ✅ Login user
export const loginUser = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.auth.login, data);
    if (response.data?.token) {
      localStorage.setItem(STORAGE_KEYS.token, response.data.token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// ✅ Fetch current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get(ENDPOINTS.auth.me, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Get Current User Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};

// ✅ Logout user
export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
};

// ✅ Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post(ENDPOINTS.auth.forgotPassword, { email });
    return response.data;
  } catch (error) {
    console.error("Forgot Password Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to send reset email" };
  }
};

// ✅ Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(ENDPOINTS.auth.resetPassword(token), {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Reset Password Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Password reset failed" };
  }
};

// ✅ Alias for forgot password
export const sendResetEmail = forgotPassword;
