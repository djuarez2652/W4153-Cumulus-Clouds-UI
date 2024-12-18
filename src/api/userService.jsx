import axios from 'axios';

// USE FOR PRODUCTION
// export const API_BASE_URL= 'https://cloud-computing-messages-ax3nlsln.ue.gateway.dev';

// USE FOR DEVELOPMENT
// export const API_BASE_URL_USERMANAGEMENT = 'http://35.227.19.71:8080';

// USE FOR LOCAL
export const API_BASE_URL_USERMANAGEMENT = 'http://localhost:8080';

/**
 * User Management API
 */
export const login = async (username, password) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/public/login`, { username, password });
};

export const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/public/register`, userData);
    console.log("Token Received:", response.data.token); // Debug the token
    return response;
};

export const fetchUserDetails = async (userId) => {
    return axios.get(`${API_BASE_URL_USERMANAGEMENT}/api/users/${userId}`);
};

export const updateUserDetails = async (userId, userData) => {
    return axios.put(`${API_BASE_URL_USERMANAGEMENT}/api/users/${userId}`, userData);
};

/**
 * Create Musician Profile
 */
export const createMusicianProfile = async (musicianData, accountId, token) => {
    console.log("Token Passed:", token); // Debug token before sending
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/accounts/musicians/createMusician?accountId=${accountId}`, musicianData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const getMusicianProfile = async (musicianId, token) => {
    return axios.get(`${API_BASE_URL_USERMANAGEMENT}/api/accounts/musicians/getMusicianById?musicianId=${musicianId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

/**
 * Upload Profile Picture
 */
export const uploadProfilePicture = async (userId, file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/accounts/${userId}/profile-picture`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

export const createBookerProfile = async (bookerData) => {
    return axios.post(`${API_BASE_URL_USERMANAGEMENT}/api/bookers`, bookerData);
};

