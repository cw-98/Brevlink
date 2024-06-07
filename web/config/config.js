const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
const conifg = {
    apiBaseURL: API_BASE_URL,
    shortenURL: `${API_BASE_URL}/shorten`,
    newUser: `${API_BASE_URL}/user`,
    getUrls: `${API_BASE_URL}/urls`,
    login: `${API_BASE_URL}/login`,
    deleteUrl: `${API_BASE_URL}/urls`
}

export default conifg;