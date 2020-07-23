import axios from 'axios';

import { BASEURL } from './apiConstants';

const axiosInstance = axios.create({
    baseURL: BASEURL,
});

// API Interceptor for common headers
axiosInstance.interceptors.request.use((config) => {
    config.headers = {
        'Content-Type': 'application/json',
    };
    return config;
});

export default {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    patch: axiosInstance.patch,
    delete: axiosInstance.delete,
    axiosInstance() {
        return axiosInstance;
    },
};