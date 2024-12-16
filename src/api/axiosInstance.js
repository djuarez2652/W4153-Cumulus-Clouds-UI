import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://cloud-computing-merged-ax3nlsln.ue.gateway.dev/', // Update with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
