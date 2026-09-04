import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// On localhost, use relative '' so Vite dev server proxies /api and cookies work properly
export const API_BASE_URL = isLocalhost
  ? ''
  : (import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL || 'https://skillswap-server-monirujjaman.vercel.app');

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor: handle network edge cases
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error' || !error.response) {
      console.warn('Network Error connecting to backend API at:', API_BASE_URL);
    }
    return Promise.reject(error);
  }
);

// Configure global default settings on standard axios as fallback
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export default api;
