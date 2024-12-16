import axios from 'axios';

const API_BASE_URL = 'https://cloud-computing-merged-ax3nlsln.ue.gateway.dev/';

export const login = async (username, password) => {
    return axios.post(`${API_BASE_URL}/api/public/login`, { username, password });
};

export const register = async (userData) => {
    return axios.post(`${API_BASE_URL}/api/public/register`, userData);
};

export const fetchUserDetails = async (userId) => {
    return axios.get(`${API_BASE_URL}/api/users/${userId}`);
};

export const updateUserDetails = async (userId, userData) => {
    return axios.put(`${API_BASE_URL}/api/users/${userId}`, userData);
};
