import axios from 'axios';

// USE FOR PRODUCTION
// export const API_BASE_URL= 'https://cloud-computing-messages-ax3nlsln.ue.gateway.dev';

// USE FOR LOCAL
export const API_BASE_URL_USERMANAGEMENT = 'http://35.227.19.71:8080';

/**
 * User Management API
 */
export const login = async (username, password) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/public/login`, { username, password });
};

export const register = async (userData) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/public/register`, userData);
};

export const fetchUserDetails = async (userId) => {
    return axios.get(`${API_BASE_URL_USERMANAGEMENT}/api/users/${userId}`);
};

export const updateUserDetails = async (userId, userData) => {
    return axios.put(`${API_BASE_URL_USERMANAGEMENT}/api/users/${userId}`, userData);
};

export const createMusicianProfile = async (musicianData) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/musicians`, musicianData);
};

export const createBookerProfile = async (bookerData) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/bookers`, bookerData);
};

