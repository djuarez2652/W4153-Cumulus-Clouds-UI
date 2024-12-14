import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const login = async (email, password) => {
    return axios.post(`${API_BASE_URL}/public/login`, { email, password });
};

export const register = async (userData) => {
    return axios.post(`${API_BASE_URL}/public/register`, userData);
};

export const fetchUserDetails = async (userId) => {
    return axios.get(`${API_BASE_URL}/users/${userId}`);
};

export const updateUserDetails = async (userId, userData) => {
    return axios.put(`${API_BASE_URL}/users/${userId}`, userData);
};
