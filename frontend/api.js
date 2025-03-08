// import dependencies
import axios from 'axios';
import MyToast from './src/Components/MyToast/MyToast';
import { store } from './src/store/store';
import { logout } from './src/store/slices/authSlice';
import { setLinkCount } from './src/store/slices/linkSlice';
import { setShopCount } from './src/store/slices/shopSlice';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for sending cookies
});

// Add response interceptor
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Extract status code and error message
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || '';

    // If unauthorized (401) but NOT from signin or signup, handle refresh
    if (
      status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/api/auth/refresh' &&
      !['Invalid credentials', 'User not found', 'Passwords do not match'].includes(errorMessage)
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the session
        await api.post('/api/auth/refresh', {}, { withCredentials: true });

        // Retry the original request
        return await api(originalRequest);
      } catch (refreshError) {
        // If refresh fails due to invalid refresh token or forbidden (403), log out
        if (
          refreshError.response?.status === 403 ||
          (refreshError.response?.status === 401 && refreshError.response?.data?.message === 'Invalid refresh token')
        ) {
          store.dispatch(logout());
          store.dispatch(setLinkCount(0));
          store.dispatch(setShopCount(0));

          MyToast('Session Expired! Logging out...', 'error');
          window.location.href = '/';
        } else {
          MyToast('Connection issue. Please try again.', 'warning');
        }

        throw refreshError;
      }
    }

    // For all other errors, just throw it as is
    throw error;
  }
);

export default api;
