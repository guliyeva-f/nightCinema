import { generateUniqueKey } from '@/utils/generate-unit-key';
import axios from 'axios';

const baseURL = `/api`;

export const $axios = axios.create({
    baseURL,
});

$axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');    
        if (config.headers) {
            config.url =
                config.url +
                `${config?.url?.includes('?') ? `&${generateUniqueKey()}` : `?${generateUniqueKey()}`} `;
            if (config?.url && token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

$axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default $axios;