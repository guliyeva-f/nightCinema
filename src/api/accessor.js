import axios from 'axios';
import { AuthService } from '@/services/auth/auth.service';
import { generateUniqueKey } from '@/utils/generate-unit-key';

// const baseURL = `/api`;
// const baseURL = import.meta.env.VITE_APP_URL + '/api';

// const baseURL = import.meta.env.DEV
//   ? 'http://localhost:5000/api'
//   : import.meta.env.VITE_APP_URL + '/api';

const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_APP_URL + '/api';

export const $axios = axios.create({
  baseURL,
});

$axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');

    if (config.headers) {
      config.url =
        config.url +
        `${config?.url?.includes('?') ? `&${generateUniqueKey()}` : `?${generateUniqueKey()}`}`;
      if (!config.url.includes('/auth/refresh_token') && token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (originalRequest.url.includes('/auth/refresh_token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return $axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await AuthService.refreshToken();
        $axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return $axios(originalRequest);
      }
      catch (refreshError) {
        processQueue(refreshError, null);
        AuthService.logout();
        return Promise.reject(refreshError);
      } 
      finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default $axios;