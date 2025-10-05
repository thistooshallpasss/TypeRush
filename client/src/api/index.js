import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    // Change to use a relative path for deployment
    baseURL: '/api', // Relative URL works when frontend and backend are on the same domain
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
  Add a request interceptor to include the token in all requests.
  This logic reads the token from localStorage (where we'll store it after login)
  and adds it to the Authorization header.
*/
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
