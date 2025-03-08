import axios from 'axios';
import MyToast from './src/Components/MyToast/MyToast';
import { store } from './src/store/store'
import { logout } from './src/store/slices/authSlice';
import { setLinkCount } from './src/store/slices/linkSlice';
import { setShopCount } from './src/store/slices/shopSlice';
import { useNavigate } from 'react-router-dom'; 
// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // Important for sending cookies
});

// Add response interceptor
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If unauthorized and not already retrying
    if (error.response?.status === 401 && 
        !originalRequest._retry &&
        originalRequest.url !== '/api/auth/refresh') {
            originalRequest._retry = true;
      
      try {
        // Call refresh endpoint using async/await
        await api.post('/api/auth/refresh', {}, { withCredentials: true });
        
        // Retry the original request with async/await
        const response = await api(originalRequest);
        return response;
      } catch (refreshError) {
        try {
            if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
            store.dispatch(logout());
            store.dispatch(setLinkCount(0));
            store.dispatch(setShopCount(0));
            const navigate = useNavigate(); 
            navigate('/');
            MyToast('Session Expired! Logout initiated ...', 'error')
            }
          } catch (logoutError) {
            console.error('Logout failed:', logoutError);
            MyToast(logoutError.message || 'Logout failed', 'error')
          }
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