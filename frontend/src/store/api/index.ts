import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});