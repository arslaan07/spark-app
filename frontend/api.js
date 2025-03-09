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
    if (error.response?.status === 401 && !originalRequest._retry && error.response?.data.message === 'No token, authorization denied') {
        console.log(error.response)
        originalRequest._retry = true;

      try {
        // Attempt to refresh the session
        await api.post('/api/auth/refresh', {}, { withCredentials: true });

        // Retry the original request
        return await api(originalRequest);
      } catch (refreshError) {
         // Refresh failed, redirect to login
         window.location.href = '/sign-in';
         throw refreshError; // Re-throw to be caught by the calling function
       }
     }
     
     // For other errors, just throw
     throw error;
   }
 );

export default api;
